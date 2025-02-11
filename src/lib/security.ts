import { z } from 'zod';

// Password validation schema
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

// Rate limiting for failed attempts
export class RateLimiter {
  private attempts: Map<string, { count: number; timestamp: number }> = new Map();
  private readonly MAX_ATTEMPTS = 5;
  private readonly LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

  checkRateLimit(identifier: string): boolean {
    const now = Date.now();
    const attempt = this.attempts.get(identifier);

    if (!attempt) {
      this.attempts.set(identifier, { count: 1, timestamp: now });
      return true;
    }

    if (now - attempt.timestamp > this.LOCKOUT_DURATION) {
      this.attempts.set(identifier, { count: 1, timestamp: now });
      return true;
    }

    if (attempt.count >= this.MAX_ATTEMPTS) {
      return false;
    }

    attempt.count += 1;
    this.attempts.set(identifier, attempt);
    return true;
  }

  getRemainingAttempts(identifier: string): number {
    const attempt = this.attempts.get(identifier);
    if (!attempt) return this.MAX_ATTEMPTS;
    return Math.max(0, this.MAX_ATTEMPTS - attempt.count);
  }

  getTimeRemaining(identifier: string): number {
    const attempt = this.attempts.get(identifier);
    if (!attempt) return 0;
    const remaining = this.LOCKOUT_DURATION - (Date.now() - attempt.timestamp);
    return Math.max(0, remaining);
  }
}