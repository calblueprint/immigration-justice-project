import CONFIG from '@/lib/configs';
import { redirect } from 'next/navigation';

export async function GET() {
  redirect(CONFIG.onboardingHome);
}
