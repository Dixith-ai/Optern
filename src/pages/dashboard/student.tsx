import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookmarkIcon, BriefcaseIcon, CheckCircleIcon, ClockIcon, MapPinIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Application {
  id: string;
  internshipTitle: string;
  company: string;
  status: 'pending' | 'interviewing' | 'accepted' | 'rejected';
  appliedDate: string;
  logo: string;
}

const applications: Application[] = [
  {
    id: '1',
    internshipTitle: 'Software Engineering Intern',
    company: 'TechCorp',
    status: 'interviewing',
    appliedDate: '2024-03-15',
    logo: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80'
  },
  {
    id: '2',
    internshipTitle: 'Marketing Intern',
    company: 'GrowthLabs',
    status: 'pending',
    appliedDate: '2024-03-10',
    logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80'
  }
];

const savedInternships = [
  {
    id: '3',
    title: 'Data Science Intern',
    company: 'AI Solutions',
    location: 'Remote',
    type: 'Full-time',
    logo: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80'
  }
];

export function StudentDashboard() {
  const getStatusBadge = (status: Application['status']) => {
    const variants = {
      pending: 'warning',
      interviewing: 'secondary',
      accepted: 'success',
      rejected: 'danger'
    };
    return variants[status];
  };

  return (
    <div className="flex-1 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
            <p className="mt-2 text-gray-600">Track your applications and saved internships</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/internships">
              <Button className="flex items-center">
                <BriefcaseIcon className="h-4 w-4 mr-2" />
                Browse Internships
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Applications</CardTitle>
              <CardDescription>Track your internship applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications.map((application) => (
                  <div
                    key={application.id}
                    className="flex items-start space-x-4 p-4 rounded-lg border bg-white"
                  >
                    <img
                      src={application.logo}
                      alt={application.company}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {application.internshipTitle}
                      </p>
                      <p className="text-sm text-gray-500">{application.company}</p>
                      <div className="mt-2 flex items-center space-x-2">
                        <Badge variant={getStatusBadge(application.status)}>
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          Applied on {new Date(application.appliedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Saved Internships</CardTitle>
              <CardDescription>Internships you're interested in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savedInternships.map((internship) => (
                  <div
                    key={internship.id}
                    className="flex items-start space-x-4 p-4 rounded-lg border bg-white"
                  >
                    <img
                      src={internship.logo}
                      alt={internship.company}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {internship.title}
                      </p>
                      <p className="text-sm text-gray-500">{internship.company}</p>
                      <div className="mt-2 flex items-center space-x-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          {internship.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {internship.type}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Apply Now
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Application Progress</CardTitle>
              <CardDescription>Your internship application journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                  <div className="flex items-center justify-between">
                    <BriefcaseIcon className="h-5 w-5 text-blue-600" />
                    <span className="text-2xl font-bold text-blue-600">2</span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-blue-900">Total Applications</p>
                </div>
                <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-100">
                  <div className="flex items-center justify-between">
                    <ClockIcon className="h-5 w-5 text-yellow-600" />
                    <span className="text-2xl font-bold text-yellow-600">1</span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-yellow-900">Pending Review</p>
                </div>
                <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
                  <div className="flex items-center justify-between">
                    <CheckCircleIcon className="h-5 w-5 text-purple-600" />
                    <span className="text-2xl font-bold text-purple-600">1</span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-purple-900">Interviewing</p>
                </div>
                <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                  <div className="flex items-center justify-between">
                    <BookmarkIcon className="h-5 w-5 text-green-600" />
                    <span className="text-2xl font-bold text-green-600">1</span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-green-900">Saved</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}