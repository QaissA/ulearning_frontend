import React from 'react';
import { CheckCircle } from 'lucide-react';

const ValueSection = () => {
    const benefits = [
        {
            title: "Streamlined Organization",
            description: "Keep track of assignments, exams, and class schedules all in one place. Never miss a deadline again.",
            icon: "calendar"
        },
        {
            title: "Grade Management",
            description: "Monitor your academic performance in real-time with intuitive grade tracking and GPA calculations.",
            icon: "chart"
        },
        {
            title: "Study Optimization",
            description: "Smart study planning tools help you prioritize tasks and maximize productive study time.",
            icon: "book"
        },
        {
            title: "Collaboration Tools",
            description: "Easily form study groups, share notes, and collaborate on projects with classmates.",
            icon: "users"
        }
    ];

    return (
        <section className="py-16 bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900/30 z-10"></div>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">Why Students Love Our App</h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        We've designed every feature with students in mind, helping you succeed academically while reducing stress.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700 hover:border-indigo-500 transition-all duration-300"
                        >
                            <div className="flex items-center mb-4">
                                <CheckCircle className="h-6 w-6 text-indigo-400 mr-2" />
                                <h3 className="text-xl font-semibold text-white">{benefit.title}</h3>
                            </div>
                            <p className="text-gray-300">{benefit.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-bold text-white mb-6">Join thousands of students improving their academic journey</h3>
                    <button className="bg-indigo-500 hover:bg-indigo-400 text-white font-medium py-3 px-8 rounded-full shadow-lg transition-all duration-300 border border-indigo-400">
                        Get Started Free
                    </button>
                    <p className="mt-4 text-gray-400">No credit card required. Start organizing your school life today.</p>
                </div>
            </div>
        </section>
    );
};

export default ValueSection;