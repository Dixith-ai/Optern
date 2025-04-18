import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckIcon, StarIcon, TrophyIcon, UsersIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: 'basic' | 'pro' | 'elite';
  name: string;
  icon: React.ReactNode;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: PlanFeature[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Community Access',
    icon: <UsersIcon className="h-6 w-6 text-blue-500" />,
    price: {
      monthly: 9,
      yearly: 90,
    },
    description: 'Perfect for students starting their internship journey',
    features: [
      { text: 'Access to Optern Community', included: true },
      { text: 'Post, comment, and engage', included: true },
      { text: 'Connect with fellow students', included: true },
      { text: 'Basic profile visibility', included: true },
      { text: 'Personal guidance', included: false },
      { text: 'Profile-based recommendations', included: false },
      { text: 'Premium community access', included: false },
      { text: '1-on-1 mentorship', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Internship Guidance',
    icon: <StarIcon className="h-6 w-6 text-indigo-500" />,
    price: {
      monthly: 29,
      yearly: 290,
    },
    description: 'For students serious about landing their dream internship',
    features: [
      { text: 'Access to Optern Community', included: true },
      { text: 'Post, comment, and engage', included: true },
      { text: 'Connect with fellow students', included: true },
      { text: 'Enhanced profile visibility', included: true },
      { text: 'Personal guidance', included: true },
      { text: 'Profile-based recommendations', included: true },
      { text: 'Premium community access', included: false },
      { text: '1-on-1 mentorship', included: false },
    ],
    popular: true,
  },
  {
    id: 'elite',
    name: 'Premium Mentorship',
    icon: <TrophyIcon className="h-6 w-6 text-yellow-500" />,
    price: {
      monthly: 99,
      yearly: 990,
    },
    description: 'Ultimate package for career success',
    features: [
      { text: 'Access to Optern Community', included: true },
      { text: 'Post, comment, and engage', included: true },
      { text: 'Connect with fellow students', included: true },
      { text: 'Priority profile visibility', included: true },
      { text: 'Personal guidance', included: true },
      { text: 'Profile-based recommendations', included: true },
      { text: 'Premium community access', included: true },
      { text: '1-on-1 mentorship', included: true },
    ],
  },
];

export function SubscriptionPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const { user, subscribe } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubscribe = (planId: Plan['id']) => {
    subscribe(planId);
    const from = location.state?.from?.pathname || '/community';
    navigate(from);
  };

  return (
    <div className="flex-1 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Choose Your Plan
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Unlock the full potential of your internship journey
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="relative self-center rounded-lg bg-gray-100 dark:bg-gray-800 p-0.5">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`relative w-32 whitespace-nowrap rounded-md py-2 text-sm font-medium ${
                billingPeriod === 'monthly'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`relative w-32 whitespace-nowrap rounded-md py-2 text-sm font-medium ${
                billingPeriod === 'yearly'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Yearly billing
              <span className="absolute -top-2 -right-12 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative flex flex-col ${
                plan.popular
                  ? 'border-2 border-blue-500 dark:border-blue-400'
                  : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-blue-500 py-1 text-center text-sm font-semibold text-white">
                  Most Popular
                </div>
              )}

              <CardHeader>
                <div className="flex items-center justify-between">
                  {plan.icon}
                  <div className="text-right">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">
                      ${billingPeriod === 'monthly' ? plan.price.monthly : plan.price.yearly}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      /{billingPeriod === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  </div>
                </div>
                <CardTitle className="text-xl mt-4">{plan.name}</CardTitle>
                <p className="text-gray-600 dark:text-gray-400">{plan.description}</p>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckIcon
                        className={`h-5 w-5 mr-3 ${
                          feature.included
                            ? 'text-green-500'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                      <span
                        className={
                          feature.included
                            ? 'text-gray-900 dark:text-gray-100'
                            : 'text-gray-400 dark:text-gray-500'
                        }
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  className="w-full"
                  variant={plan.popular ? 'primary' : 'outline'}
                >
                  {user?.subscription?.plan === plan.id
                    ? 'Current Plan'
                    : 'Subscribe Now'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Why Subscribe to Optern?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                <UsersIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Community Support
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Connect with peers and mentors who understand your journey
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900 mb-4">
                <StarIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Expert Guidance
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Get personalized advice from industry professionals
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
                <TrophyIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Career Success
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Maximize your chances of landing your dream internship
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}