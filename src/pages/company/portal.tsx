import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BriefcaseIcon, FileTextIcon, PlusIcon, UsersIcon, XIcon } from 'lucide-react';
import { useState } from 'react';

interface Application {
  id: string;
  candidateName: string;
  position: string;
  status: 'pending' | 'reviewing' | 'interviewed' | 'offered' | 'rejected';
  appliedDate: string;
  avatar: string;
  resumeUrl: string;
}

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  applicants: number;
  status: 'active' | 'inactive';
  postedDate: string;
}

const applications: Application[] = [
  {
    id: '1',
    candidateName: 'Sarah Chen',
    position: 'Software Engineering Intern',
    status: 'reviewing',
    appliedDate: '2024-03-15',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    resumeUrl: 'https://example.com/resume1.pdf'
  },
  {
    id: '2',
    candidateName: 'Michael Rodriguez',
    position: 'Marketing Intern',
    status: 'interviewed',
    appliedDate: '2024-03-10',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    resumeUrl: 'https://example.com/resume2.pdf'
  }
];

const jobs: Job[] = [
  {
    id: '1',
    title: 'Software Engineering Intern',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'Full-time',
    applicants: 45,
    status: 'active',
    postedDate: '2024-03-01'
  },
  {
    id: '2',
    title: 'Marketing Intern',
    department: 'Marketing',
    location: 'Remote',
    type: 'Part-time',
    applicants: 32,
    status: 'inactive',
    postedDate: '2024-03-05'
  }
];

export function CompanyPortal() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'applications' | 'jobs'>('overview');
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [jobStatuses, setJobStatuses] = useState<Record<string, Job['status']>>(
    jobs.reduce((acc, job) => ({ ...acc, [job.id]: job.status }), {})
  );

  const getStatusBadge = (status: Application['status']) => {
    const variants = {
      pending: 'warning',
      reviewing: 'secondary',
      interviewed: 'secondary',
      offered: 'success',
      rejected: 'danger'
    };
    return variants[status];
  };

  const getJobStatusBadge = (status: Job['status']) => {
    return status === 'active' ? 'success' : 'secondary';
  };

  const toggleJobStatus = (jobId: string) => {
    setJobStatuses(prev => ({
      ...prev,
      [jobId]: prev[jobId] === 'active' ? 'inactive' : 'active'
    }));
  };

  const updateApplicationStatus = (applicationId: string, newStatus: Application['status']) => {
    // In a real app, this would make an API call
    console.log(`Updating application ${applicationId} to ${newStatus}`);
  };

  const jobApplications = applications.filter(app => 
    selectedJob ? app.position === jobs.find(j => j.id === selectedJob)?.title : true
  );

  return (
    <div className="flex-1 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Company Portal</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your internship postings and applications</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="flex items-center">
              <PlusIcon className="h-4 w-4 mr-2" />
              Post New Internship
            </Button>
          </div>
        </div>

        <div className="mt-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => {
                  setSelectedTab('overview');
                  setSelectedJob(null);
                }}
                className={`${
                  selectedTab === 'overview'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                } whitespace-nowrap pb-4 px-1 border-b-2 font-medium`}
              >
                Overview
              </button>
              <button
                onClick={() => {
                  setSelectedTab('applications');
                  setSelectedJob(null);
                }}
                className={`${
                  selectedTab === 'applications'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                } whitespace-nowrap pb-4 px-1 border-b-2 font-medium`}
              >
                Applications
              </button>
              <button
                onClick={() => {
                  setSelectedTab('jobs');
                  setSelectedJob(null);
                }}
                className={`${
                  selectedTab === 'jobs'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                } whitespace-nowrap pb-4 px-1 border-b-2 font-medium`}
              >
                Job Postings
              </button>
            </nav>
          </div>
        </div>

        {selectedTab === 'overview' && (
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Active Jobs</CardTitle>
                  <BriefcaseIcon className="h-5 w-5 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {Object.values(jobStatuses).filter(status => status === 'active').length}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Currently active internship postings</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Total Applications</CardTitle>
                  <FileTextIcon className="h-5 w-5 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">77</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Applications received</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Candidates</CardTitle>
                  <UsersIcon className="h-5 w-5 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">45</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Unique applicants</p>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === 'applications' && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Applications</CardTitle>
                    <CardDescription>
                      {selectedJob 
                        ? `Viewing applications for ${jobs.find(j => j.id === selectedJob)?.title}`
                        : 'All applications'
                      }
                    </CardDescription>
                  </div>
                  {selectedJob && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedJob(null)}
                      className="flex items-center"
                    >
                      <XIcon className="h-4 w-4 mr-2" />
                      Clear Filter
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobApplications.map((application) => (
                    <div
                      key={application.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={application.avatar}
                          alt={application.candidateName}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{application.candidateName}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{application.position}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <a
                          href={application.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          View Resume
                        </a>
                        <select
                          value={application.status}
                          onChange={(e) => updateApplicationStatus(application.id, e.target.value as Application['status'])}
                          className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewing">Reviewing</option>
                          <option value="interviewed">Interviewed</option>
                          <option value="offered">Offered</option>
                          <option value="rejected">Rejected</option>
                        </select>
                        <Badge variant={getStatusBadge(application.status)}>
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === 'jobs' && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Job Postings</CardTitle>
                <CardDescription>Manage your internship listings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{job.title}</p>
                        <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span>{job.department}</span>
                          <span>•</span>
                          <span>{job.location}</span>
                          <span>•</span>
                          <span>{job.type}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedTab('applications');
                            setSelectedJob(job.id);
                          }}
                        >
                          View Applications ({job.applicants})
                        </Button>
                        <div className="flex items-center space-x-2">
                          <Badge variant={getJobStatusBadge(jobStatuses[job.id])}>
                            {jobStatuses[job.id].charAt(0).toUpperCase() + jobStatuses[job.id].slice(1)}
                          </Badge>
                          <Button
                            variant={jobStatuses[job.id] === 'active' ? 'outline' : 'primary'}
                            size="sm"
                            onClick={() => toggleJobStatus(job.id)}
                          >
                            {jobStatuses[job.id] === 'active' ? 'Deactivate' : 'Activate'}
                          </Button>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}