import { redirect } from 'next/navigation';
import CONFIG from '@/lib/configs';

export async function GET() {
  redirect(CONFIG.onboardingHome);
}
