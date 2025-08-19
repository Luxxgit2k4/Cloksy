import React from 'react';
// importing icons from lucide library
import { Clock, BarChart, Users, Check } from 'lucide-react';

// Features container 
export const Features = () => {
    // Array of objects for the four cards in feature section
  const list = [
    { icon: <Clock />, title: "Easy Time Tracking", description: "Log hours with our intuitive calendar interface." },
    { icon: <BarChart />, title: "Detailed Reports", description: "Generate comprehensive analytics and insights." },
    { icon: <Users />, title: "Team Management", description: "Manage and approve employee timesheets." },
    { icon: <Check />, title: "Approval Workflow", description: "Streamlined approval and review process." },
  ];

  return (
    // Features section 
    <section className="pt-0 md:pt-4 pb-16 md:pb-24 px-6">
        {/* Responsive grid container md - 768px lg- 1024px default - mobile*/}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         
           {/* Looping through each item in the list array */} 
           
            {list.map((feature, index) => (
                // Using index to create a card for the features in the list
                <div key={index} className="text-center p-4">

                    {/* Icon container */}
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto">
                        {feature.icon}
                    </div>

                    {/* Feature title and description container */}
                    <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
                    <p className="text-gray-600 mt-2">{feature.description}</p>
                </div>
            ))}
        </div>
    </section>
  );
};