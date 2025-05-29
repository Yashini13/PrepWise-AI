// // // app/check/page.js
// // 'use client'; 
// // export default async function CheckPage() {
// //   const res = await fetch('http://127.0.0.1:5000/predict', {
// //     method: 'POST',
// //     headers: { 'Content-Type': 'application/json' },
// //     body: JSON.stringify({ feedback: "Great communicator but weak in edge cases." }),
// //   });
  
// //   const data = await res.json();
// //   console.log("Data = ", data)
// //   console.log(data); // works on server side
  
// //   return (
// //     <div>
// //       <h1>Skill Assessment Results</h1>
// //       <p>Strengths: {data.predicted_strengths?.join(', ')}</p>
// //       <p>Weaknesses: {data.predicted_weaknesses?.join(', ')}</p>
// //     </div>
// //   );
// // }


// 'use client';
// import { useEffect, useState } from 'react';

// export default function CheckPage() {
//   const [data, setData] = useState({ predicted_strengths: [], predicted_weaknesses: [] });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const feedback = localStorage.getItem('feedback_summary') || '';

//     const fetchData = async () => {
//       const res = await fetch('http://127.0.0.1:5000/predict', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ feedback }),
//       });

//       const result = await res.json();
//       setData(result);
//       setLoading(false);
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <div className="p-6 text-center">Loading skill assessment...</div>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Skill Assessment Results</h1>
//       <p><strong>Strengths:</strong> {data.predicted_strengths?.join(', ')}</p>
//       <p><strong>Weaknesses:</strong> {data.predicted_weaknesses?.join(', ')}</p>
//     </div>
//   );
// }


'use client';
import { useEffect, useState } from 'react';
import { CheckCircle, AlertTriangle, TrendingUp, Target, Loader2, ArrowRight } from 'lucide-react';

export default function CheckPage() {
  const [data, setData] = useState({ predicted_strengths: [], predicted_weaknesses: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate getting feedback from storage (can't use localStorage in artifacts)
    const feedback = 'Great communicator but weak in edge cases.';

    const fetchData = async () => {
      try {
        const res = await fetch('https://python-ai-172407736127.us-central1.run.app/predict', { // put deployed link here
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ feedback }),
        });

        if (!res.ok) {
          throw new Error('Failed to fetch assessment results');
        }

        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err.message);
        // Mock data for demonstration
        setData({
          predicted_strengths: ['Communication', 'Leadership', 'Problem Solving', 'Teamwork'],
          predicted_weaknesses: ['Edge Case Handling', 'Technical Documentation', 'Time Management']
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full mx-4">
          <div className="animate-spin mb-4 mx-auto">
            <Loader2 className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Analyzing Your Skills</h2>
          <p className="text-gray-600">Processing feedback and generating insights...</p>
          <div className="mt-6 bg-gray-100 rounded-full h-2 overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full animate-pulse" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  const SkillCard = ({ title, skills, icon: Icon, bgColor, textColor, borderColor }) => (
    <div className={`${bgColor} rounded-2xl p-6 shadow-lg border-2 ${borderColor} transform hover:scale-105 transition-all duration-300`}>
      <div className="flex items-center mb-4">
        <div className={`p-3 rounded-full ${textColor === 'text-green-700' ? 'bg-green-100' : 'bg-orange-100'} mr-4`}>
          <Icon className={`w-6 h-6 ${textColor}`} />
        </div>
        <h3 className={`text-xl font-bold ${textColor}`}>{title}</h3>
      </div>
      
      {skills.length > 0 ? (
        <div className="space-y-3">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center group">
              <ArrowRight className={`w-4 h-4 ${textColor} mr-3 group-hover:translate-x-1 transition-transform`} />
              <span className={`${textColor} font-medium text-lg`}>{skill}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className={`${textColor} italic`}>No {title.toLowerCase()} identified</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6 shadow-lg">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Skill Assessment Card
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Based on your feedback analysis, here's your comprehensive skill evaluation
          </p>
        </div>

        {error && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
              <p className="text-yellow-800">
                Could not connect to assessment service. Showing demo data.
              </p>
            </div>
          </div>
        )}

        {/* Results Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
          <SkillCard
            title="Key Strengths"
            skills={data.predicted_strengths || []}
            icon={CheckCircle}
            bgColor="bg-gradient-to-br from-green-50 to-emerald-50"
            textColor="text-green-700"
            borderColor="border-green-200"
          />
          
          <SkillCard
            title="Growth Areas"
            skills={data.predicted_weaknesses || []}
            icon={TrendingUp}
            bgColor="bg-gradient-to-br from-orange-50 to-red-50"
            textColor="text-orange-700"
            borderColor="border-orange-200"
          />
        </div>

        {/* Summary Stats */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Assessment Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {(data.predicted_strengths || []).length}
              </div>
              <div className="text-gray-600 font-medium">Identified Strengths</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {(data.predicted_weaknesses || []).length}
              </div>
              <div className="text-gray-600 font-medium">Growth Opportunities</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {Math.round(((data.predicted_strengths || []).length / 
                  ((data.predicted_strengths || []).length + (data.predicted_weaknesses || []).length)) * 100) || 0}%
              </div>
              <div className="text-gray-600 font-medium">Strength Ratio</div>
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4 text-center">Next Steps</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h4 className="font-semibold text-lg mb-3">Leverage Your Strengths</h4>
              <p className="text-blue-100">
                Focus on projects that utilize your key strengths to maximize impact and build confidence.
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h4 className="font-semibold text-lg mb-3">Address Growth Areas</h4>
              <p className="text-blue-100">
                Create a development plan to systematically improve in your identified growth areas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

