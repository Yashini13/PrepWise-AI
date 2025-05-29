"use client";
import React, { useEffect, useState } from 'react';
import { Loader2, Calendar, CheckCircle, Target, ArrowLeft, Clock, Star } from 'lucide-react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RoadmapPage = () => {
  const [roadmap, setRoadmap] = useState('');
  const [loading, setLoading] = useState(true);
  const [parsedRoadmap, setParsedRoadmap] = useState([]);
  const [completedTasks, setCompletedTasks] = useState({});

  // Toggle task completion
  const toggleTaskCompletion = (weekIndex, taskIndex) => {
    const taskId = `${weekIndex}-${taskIndex}`;
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  // Calculate completion statistics
  const getCompletionStats = () => {
    const totalTasks = parsedRoadmap.reduce((acc, week) => acc + week.tasks.length, 0);
    const completedCount = Object.values(completedTasks).filter(Boolean).length;
    const completionPercentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
    return { totalTasks, completedCount, completionPercentage };
  };

  // Parse the roadmap text into structured data
  const parseRoadmap = (text) => {
    const weeks = [];
    const lines = text.split('\n').filter(line => line.trim());
    let currentWeek = null;

    lines.forEach(line => {
      const weekMatch = line.match(/Week (\d+):\s*(.*)/);
      if (weekMatch) {
        if (currentWeek) weeks.push(currentWeek);
        currentWeek = {
          number: parseInt(weekMatch[1]),
          title: weekMatch[2] || '',
          tasks: []
        };
      } else if ((line.trim().startsWith('-') || line.trim().startsWith('*')) && currentWeek) {
        const task = line.replace(/^[-*]\s*/, '').trim();
        if (task) {
          currentWeek.tasks.push(task);
        }
      }
    });
    
    if (currentWeek) weeks.push(currentWeek);
    return weeks;
  };

  useEffect(() => {
    const fetchRoadmap = async () => {
      setLoading(true);
      const feedback = localStorage.getItem('roadmap_feedback');

      if (!feedback) {
        setRoadmap("No feedback found to generate roadmap.");
        setLoading(false);
        return;
      }

      const payload = {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Based on the following interview feedback, generate a detailed, point-wise 4-week progress roadmap. Each week should have specific, actionable steps focused on addressing the feedback areas.

Interview Feedback: ${feedback}

Please format as:
Week 1: [Week Title]
- [Actionable Point 1]
- [Actionable Point 2]
- [Actionable Point 3]

Week 2: [Week Title]
- [Actionable Point 1]
- [Actionable Point 2]
- [Actionable Point 3]

Week 3: [Week Title]
- [Actionable Point 1]
- [Actionable Point 2]
- [Actionable Point 3]

Week 4: [Week Title]
- [Actionable Point 1]
- [Actionable Point 2]
- [Actionable Point 3]`
              },
            ],
          },
        ],
      };

      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No roadmap generated.';
        
        // Set the roadmap text and parse it
        setRoadmap(generatedText.replace(/\*\*/g, ''));
        setParsedRoadmap(parseRoadmap(generatedText));
      } catch (err) {
        console.error(err);
        setRoadmap("Error generating roadmap. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, []);

  const WeekCard = ({ week, index }) => {
    const weekCompletedTasks = week.tasks.filter((_, taskIndex) => 
      completedTasks[`${index}-${taskIndex}`]
    ).length;
    const weekCompletionPercentage = week.tasks.length > 0 
      ? Math.round((weekCompletedTasks / week.tasks.length) * 100) 
      : 0;

    return (
      <div className="relative">
        {/* Timeline connector */}
        {index < parsedRoadmap.length - 1 && (
          <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-indigo-300 to-purple-300 z-0"></div>
        )}
        
        <div className="relative z-10 flex items-start space-x-4 mb-8">
          {/* Week number circle */}
          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-300 ${
            weekCompletionPercentage === 100 
              ? 'bg-gradient-to-br from-green-500 to-green-600' 
              : 'bg-gradient-to-br from-indigo-500 to-purple-600'
          }`}>
            {weekCompletionPercentage === 100 ? '✓' : week.number}
          </div>
          
          {/* Week content */}
          <Card className="flex-1 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-indigo-500">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
                  Week {week.number}
                </h3>
                <div className="flex items-center space-x-3">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">{weekCompletedTasks}/{week.tasks.length}</span> completed
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    7 days
                  </div>
                </div>
              </div>
              {week.title && (
                <p className="text-lg text-indigo-700 font-medium mt-1">
                  {week.title}
                </p>
              )}
              {/* Week progress bar */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-indigo-600">{weekCompletionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${weekCompletionPercentage}%` }}
                  ></div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {week.tasks.map((task, taskIndex) => {
                  const taskId = `${index}-${taskIndex}`;
                  const isCompleted = completedTasks[taskId];
                  
                  return (
                    <div 
                      key={taskIndex}
                      className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-300 cursor-pointer ${
                        isCompleted 
                          ? 'bg-green-50 border border-green-200' 
                          : 'bg-gray-50 hover:bg-indigo-50 border border-transparent'
                      }`}
                      onClick={() => toggleTaskCompletion(index, taskIndex)}
                    >
                      <button
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 transition-all duration-200 ${
                          isCompleted
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-300 hover:border-indigo-400'
                        }`}
                      >
                        {isCompleted && <CheckCircle className="w-3 h-3" />}
                      </button>
                      <span className={`leading-relaxed transition-all duration-200 ${
                        isCompleted 
                          ? 'text-green-700' 
                          : 'text-gray-700'
                      }`}>
                        {task}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-4">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Your Personalized Progress Roadmap
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A structured 4-week plan to address your interview feedback and accelerate your growth
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <Card className="shadow-xl">
            <CardContent className="py-12">
              <div className="text-center">
                <Loader2 className="mx-auto animate-spin text-indigo-500 w-8 h-8 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Generating Your Roadmap
                </h3>
                <p className="text-gray-600">
                  Analyzing your feedback and creating a personalized plan...
                </p>
                <div className="mt-6 max-w-md mx-auto bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full animate-pulse w-3/4"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Roadmap Content */}
        {!loading && parsedRoadmap.length > 0 && (
          <div className="space-y-8 ">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card className="text-center p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <Calendar className="w-8 h-8 mx-auto mb-2" />
                <h3 className="text-2xl font-bold">4 Weeks</h3>
                <p className="text-blue-100">Total Duration</p>
              </Card>
              <Card className="text-center p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                <h3 className="text-2xl font-bold">{getCompletionStats().totalTasks}</h3>
                <p className="text-green-100">Total Tasks</p>
              </Card>
              <Card className="text-center p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <Star className="w-8 h-8 mx-auto mb-2" />
                <h3 className="text-2xl font-bold">{getCompletionStats().completedCount}</h3>
                <p className="text-purple-100">Completed</p>
              </Card>
              <Card className="text-center p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <Target className="w-8 h-8 mx-auto mb-2" />
                <h3 className="text-2xl font-bold">{getCompletionStats().completionPercentage}%</h3>
                <p className="text-orange-100">Progress</p>
              </Card>
            </div>

            {/* Overall Progress Bar */}
            <Card className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-800">Overall Progress</h3>
                <span className="text-2xl font-bold text-indigo-600">{getCompletionStats().completionPercentage}%</span>
              </div>
              <div className="w-full bg-white rounded-full h-4 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full transition-all duration-700 shadow-lg"
                  style={{ width: `${getCompletionStats().completionPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {getCompletionStats().completedCount} of {getCompletionStats().totalTasks} tasks completed
              </p>
            </Card>

            {/* Timeline */}
            <div className="relative">
              {parsedRoadmap.map((week, index) => (
                <WeekCard key={week.number} week={week} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && parsedRoadmap.length === 0 && roadmap && (
          <Card className="shadow-xl">
            <CardContent className="py-12 text-center">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Raw Roadmap Content
                </h3>
                <div className="bg-gray-50 rounded-lg p-6 text-left">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed">
                    {roadmap}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-center mt-12">
          <Button 
            onClick={() => window.location.href = '/dashboard'}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;