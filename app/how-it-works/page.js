// "use client";

// import React from "react";
// import { Bot, UserCheck, Settings, Play, Send, ChartBar, Repeat } from "lucide-react";

// const HowItWorksPage = () => {
//   const steps = [
//     {
//       icon: <UserCheck size={48} className="text-indigo-600" />,
//       title: "Sign Up or Log In",
//       description: "Create an account or log in using Clerk. Build a personalized profile that tracks your interview journey and stores preferences."
//     },
//     {
//       icon: <Settings size={48} className="text-indigo-600" />,
//       title: "Choose Your Interview Type",
//       description: "Select from technical, behavioral, or mixed interviews. Customize difficulty, topics, and duration to match your career goals."
//     },
//     {
//       icon: <Play size={48} className="text-indigo-600" />,
//       title: "Start the Mock Interview",
//       description: "Our AI generates dynamic, contextually relevant questions powered by Gemini. One question at a time keeps you focused and engaged."
//     },
//     {
//       icon: <Send size={48} className="text-indigo-600" />,
//       title: "Submit Your Answers",
//       description: "Respond via text or multiple-choice options. Our intuitive interface tracks your responses and provides a seamless experience."
//     },
//     {
//       icon: <ChartBar size={48} className="text-indigo-600" />,
//       title: "Receive Real-Time Feedback",
//       description: "Get instant, AI-powered analysis of your responses. Understand your strengths, areas for improvement, and receive detailed scoring."
//     },
//     {
//       icon: <Repeat size={48} className="text-indigo-600" />,
//       title: "Continue Practicing",
//       description: "Access your interview history, track progress, and keep refining your skills with unlimited mock interviews and adaptive challenges."
//     }
//   ];

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="text-center mb-12">
//         <h1 className="text-4xl font-bold text-gray-800 mb-4">
//           <Bot className="inline-block mr-3 text-indigo-600" size={48} />
//           PrepWise AI: Your Interview Preparation Companion
//         </h1>
//         <p className="text-xl text-gray-600">
//           Master your interviews with AI-powered practice and personalized insights
//         </p>
//       </div>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {steps.map((step, index) => (
//           <div 
//             key={step.title} 
//             className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105"
//           >
//             <div className="flex items-center mb-4">
//               {step.icon}
//               <h2 className="ml-4 text-2xl font-semibold text-gray-800">
//                 Step {index + 1}: {step.title}
//               </h2>
//             </div>
//             <p className="text-gray-600">{step.description}</p>
//           </div>
//         ))}
//       </div>

//       <div className="text-center mt-12">
//         <a 
//           href="/dashboard" 
//           className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg hover:bg-indigo-700 transition-colors"
//         >
//           Start Your Interview Journey
//         </a>
//       </div>
//     </div>
//   );
// };

// export default HowItWorksPage;


"use client";
import React from "react";
import { Bot, UserCheck, Settings, Play, Send, BarChart3, Repeat, ArrowDown, CheckCircle } from "lucide-react";

const HowItWorksPage = () => {
  const steps = [
    {
      icon: <UserCheck size={32} className="text-white" />,
      title: "Sign Up or Log In",
      description: "Create an account or log in using Clerk. Build a personalized profile that tracks your interview journey and stores preferences.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Settings size={32} className="text-white" />,
      title: "Choose Your Interview Type",
      description: "Select from technical, behavioral, or mixed interviews. Customize difficulty, topics, and duration to match your career goals.",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      icon: <Play size={32} className="text-white" />,
      title: "Start the Mock Interview",
      description: "Our AI generates dynamic, contextually relevant questions powered by Gemini. One question at a time keeps you focused and engaged.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: <Send size={32} className="text-white" />,
      title: "Submit Your Answers",
      description: "Respond via text or multiple-choice options. Our intuitive interface tracks your responses and provides a seamless experience.",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50"
    },
    {
      icon: <BarChart3 size={32} className="text-white" />,
      title: "Receive Real-Time Feedback",
      description: "Get instant, AI-powered analysis of your responses. Understand your strengths, areas for improvement, and receive detailed scoring.",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: <Repeat size={32} className="text-white" />,
      title: "Continue Practicing",
      description: "Access your interview history, track progress, and keep refining your skills with unlimited mock interviews and adaptive challenges.",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 from-gray-50 via-blue-50 to-indigo-50 w-full">
      <div className="w-full px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <Bot size={40} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            How PrepWise AI Works
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Master your interviews with our AI-powered practice platform in just 6 simple steps
          </p>
        </div>

        {/* Steps Container */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Step Content */}
              <div className="flex items-center mb-8">
                {/* Left side - Step number and icon */}
                <div className="flex-shrink-0 relative">
                  {/* Step Number Circle */}
                  <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg border-4 border-gray-100 relative z-10">
                    <span className="text-2xl font-bold text-gray-700">{index + 1}</span>
                  </div>
                  
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-gray-300 to-gray-200"></div>
                  )}
                </div>

                {/* Right side - Content */}
                <div className="ml-8 flex-1">
                  <div className={`${step.bgColor} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                    <div className="flex items-start space-x-6">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        {step.icon}
                      </div>
                      
                      {/* Text Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center">
                          {step.title}
                          <CheckCircle className="ml-3 w-5 h-5 text-green-500 opacity-0 hover:opacity-100 transition-opacity" />
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow between steps (hidden on last step) */}
              {index < steps.length - 1 && (
                <div className="flex justify-center mb-8">
                  <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md border-2 border-gray-100">
                    <ArrowDown className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Success Message */}
        <div className="text-center mt-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6 shadow-lg">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of successful candidates who have improved their interview skills with PrepWise AI
          </p>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12 max-w-4xl mx-auto">
          <a
            href="/dashboard"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 hover:from-indigo-700 hover:to-purple-700"
          >
            <Play className="mr-3 w-5 h-5" />
            Start Your Interview Journey
            <ArrowDown className="ml-3 w-5 h-5 rotate-[-90deg]" />
          </a>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-gray-800 mb-2">AI-Powered</h4>
            <p className="text-gray-600 text-sm">Advanced AI generates relevant questions tailored to your field</p>
          </div>
          
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-gray-800 mb-2">Real-time Feedback</h4>
            <p className="text-gray-600 text-sm">Instant analysis and scoring to improve your performance</p>
          </div>
          
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Repeat className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-gray-800 mb-2">Unlimited Practice</h4>
            <p className="text-gray-600 text-sm">Practice as much as you want with varied question sets</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;