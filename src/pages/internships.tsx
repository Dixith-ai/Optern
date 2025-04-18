import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BriefcaseIcon, ClockIcon, MapPinIcon, SearchIcon, SlidersHorizontalIcon } from 'lucide-react';
import { useState } from 'react';

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  duration: string;
  description: string;
  logo: string;
}

const internships: Internship[] = [
  {
    id: '1',
    title: 'Software Engineering Intern',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    type: 'Full-time',
    duration: '3 months',
    description: 'Join our engineering team to build scalable web applications using modern technologies.',
    logo: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80'
  },
  {
    id: '2',
    title: 'Marketing Intern',
    company: 'GrowthLabs',
    location: 'New York, NY',
    type: 'Part-time',
    duration: '6 months',
    description: 'Help develop and execute digital marketing campaigns for high-growth startups.',
    logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80'
  },
  {
    id: '3',
    title: 'Data Science Intern',
    company: 'AI Solutions',
    location: 'Remote',
    type: 'Full-time',
    duration: '4 months',
    description: 'Work on machine learning projects and help improve our AI algorithms.',
    logo: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80'
  }
];

export function InternshipsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || internship.type === selectedType;
    const matchesLocation = !selectedLocation || internship.location === selectedLocation;
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="flex-1 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Browse Internships</h1>
            <p className="mt-2 text-gray-600">Find your perfect internship opportunity</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="outline" className="flex items-center">
              <SlidersHorizontalIcon className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center border-2 border-gray-200 rounded-lg bg-white">
            <div className="px-4">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by title or company..."
              className="w-full py-3 px-4 text-gray-700 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredInternships.map((internship) => (
            <Card key={internship.id} variant="hover">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <img
                      src={internship.logo}
                      alt={internship.company}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div className="ml-4">
                      <CardTitle className="text-xl">{internship.title}</CardTitle>
                      <CardDescription>{internship.company}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{internship.description}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPinIcon className="h-4 w-4 mr-2" />
                    {internship.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <BriefcaseIcon className="h-4 w-4 mr-2" />
                    {internship.type}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="h-4 w-4 mr-2" />
                    {internship.duration}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Apply Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}