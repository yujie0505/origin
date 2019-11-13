import { employeeUnlockDate, investorUnlockDate } from '@/constants'

export const getNextOnboardingPage = user => {
  if (user.otpVerified) {
    // Verified OTP can no longer perform any onboarding as OTP would be required
    // for any login action
    return null
  } else if (!user.termsAgreedAt) {
    return '/terms'
  } else if (!user.revisedScheduleAgreedAt && !user.revisedScheduleRejected) {
    return '/revised_schedule'
  } else if (!user.phone) {
    return '/phone'
  } else {
    // Only remaining step is OTP setup
    return '/otp/explain'
  }
}

export const getUnlockDate = user => {
  if (!user) return
  return user.employee ? employeeUnlockDate : investorUnlockDate
}