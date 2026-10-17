/**
 * Reads a user's subscription plan and status from the database.
 *
 * Razorpay webhooks update raw fields (`plan`, `subscriptionStatus`,
 * `subscriptionRenewsAt`). This module translates those into a
 * user-facing `UserSubscription` object.
 *
 * @module features/billing/server/subscription
 */

import "server-only";

import type {
  SubscriptionPlan,
  UserSubscription,
} from "@/features/dashboard/lib/types";

import { prisma } from "@/lib/db";

/** Normalizes the string stored in Prisma to our SubscriptionPlan union. */
function getPlanFromDb(plan: string): SubscriptionPlan {
  return plan === "pro" ? "pro" : "free";
}

/**
 * Maps database subscription fields to a user-facing status.
 *
 * Pro users whose cancellation has been scheduled remain active
 * until their current paid period expires.
 */
function getStatusFromDb(
  plan: SubscriptionPlan,
  subscriptionStatus: string | null,
  subscriptionRenewsAt: Date | null
): UserSubscription["status"] {
  if (plan !== "pro") {
    return "active";
  }

  if (subscriptionStatus === "canceled") {
    if (
      subscriptionRenewsAt &&
      subscriptionRenewsAt > new Date()
    ) {
      return "active";
    }

    return "canceled";
  }

  if (subscriptionStatus === "pending") {
    return "trialing";
  }

  if (subscriptionStatus === "active") {
    return "active";
  }

  return "canceled";
}

/** Pro features apply only when the effective plan is pro and status is active. */
function getEffectivePlan(
  plan: SubscriptionPlan,
  status: UserSubscription["status"]
): SubscriptionPlan {
  if (plan === "pro" && status === "active") {
    return "pro";
  }

  return "free";
}

/**
 * Loads the current subscription snapshot for a user.
 *
 * `cancelAtPeriodEnd` is true when cancellation has been requested
 * but the user still has paid Pro access until the renewal date.
 */
export async function getUserSubscription(
  userId: string
): Promise<UserSubscription> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      plan: true,
      subscriptionStatus: true,
      subscriptionRenewsAt: true,
    },
  });

  if (!user) {
    return {
      plan: "free",
      status: "active",
      renewsAt: null,
      cancelAtPeriodEnd: false,
    };
  }

  const dbPlan = getPlanFromDb(user.plan);

  const hasFutureRenewalDate =
    user.subscriptionRenewsAt !== null &&
    user.subscriptionRenewsAt > new Date();

  // In this project, "canceled" plus a future renewal date represents
  // a scheduled cancellation with Pro access still available.
  const cancelAtPeriodEnd =
    dbPlan === "pro" &&
    user.subscriptionStatus === "canceled" &&
    hasFutureRenewalDate;

  const status = getStatusFromDb(
    dbPlan,
    user.subscriptionStatus,
    user.subscriptionRenewsAt
  );

  const plan = getEffectivePlan(dbPlan, status);

  const renewsAt = user.subscriptionRenewsAt
    ? user.subscriptionRenewsAt.toISOString()
    : null;

  return {
    plan,
    status,
    renewsAt,
    cancelAtPeriodEnd,
  };
}