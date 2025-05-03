
import { useState } from "react";
import { Button } from "@/components/ui/button";
import JobApplicationForm from "@/components/JobApplicationForm";

interface JobCardProps {
  category: string;
  jobType: string;
  title: string;
  location: string;
  fullTime: boolean;
  postedDate: string;
  description: string;
  requirements: string[];
}

const JobCard = ({
  category,
  jobType,
  title,
  location,
  fullTime,
  postedDate,
  description,
  requirements
}: JobCardProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleApply = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden mb-6">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-kap-navy text-white text-sm py-1 px-3 rounded-full">
                {category}
              </span>
              <span className="text-gray-600 text-sm">{jobType}</span>
            </div>
            <h3 className="text-xl font-bold text-kap-navy">{title}</h3>
            <div className="flex items-center gap-4 mt-2 text-gray-600 text-sm">
              <div className="flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mr-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                </svg>
                {location}
              </div>
              <div className="flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mr-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                {fullTime ? "Full-time" : "Part-time"}
              </div>
              <div className="flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mr-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
                Diposting: {postedDate}
              </div>
            </div>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button 
              className="bg-kap-navy hover:bg-kap-blue text-white"
              onClick={handleApply}
            >
              Lamar Sekarang
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-700 mb-4">{description}</p>
          <h4 className="font-semibold text-kap-navy mb-2">Persyaratan:</h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Job Application Form Dialog */}
      <JobApplicationForm 
        isOpen={isFormOpen} 
        onClose={closeForm} 
        jobTitle={title} 
      />
    </div>
  );
};

export default JobCard;
