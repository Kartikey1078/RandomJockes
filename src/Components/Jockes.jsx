import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

function Jokes() {
    const [joke, setJoke] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [emoji, setEmoji] = useState("😂"); // Emoji changes dynamically

    const apiUrl = 'https://official-joke-api.appspot.com/jokes/random';

    const fetchData = async () => {
        setLoading(true);
        setShowConfetti(false); // Reset confetti
        setEmoji("⏳"); // Change emoji while loading
        
        try {
            let response = await axios.get(apiUrl);
            setTimeout(() => {
                setJoke(response.data);
                setLoading(false);
                setEmoji("🤣"); // Change emoji after loading
                setShowConfetti(true); // Trigger confetti
                setTimeout(() => setShowConfetti(false), 2000); // Auto-hide confetti
            }, 1200);
        } catch (error) {
            console.log('Error fetching joke:', error);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
            {showConfetti && <Confetti />}

            {/* Floating Glass Card */}
            <motion.div 
                className="max-w-lg w-full p-8 bg-opacity-10 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-800 text-center neon-glow"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
            >
                {/* Dynamic Emoji */}
                <motion.div 
                    className="text-6xl mb-4"
                    animate={{ rotate: [0, 10, -10, 0], transition: { repeat: Infinity, duration: 1.5 } }}
                >
                    {emoji}
                </motion.div>

                <h1 className="text-4xl font-extrabold neon-text">
                    Random Joke Generator
                </h1>

                {/* Joke Display */}
                {loading ? (
                    <p className="text-lg text-gray-300 animate-pulse mt-4">Fetching a hilarious joke... ⏳</p>
                ) : joke ? (
                    <motion.div 
                        key={joke.id} 
                        className="mt-6"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-2xl font-bold text-white tracking-wide">{joke.setup}</p>
                        <motion.div 
                            className="w-10 h-1 bg-pink-500 mx-auto my-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "2.5rem" }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        />
                        <p className="text-xl text-gray-300 italic">{joke.punchline}</p>
                    </motion.div>
                ) : (
                    <p className="text-lg text-gray-400 mt-4">Click the button to get a joke! 😆</p>
                )}

                {/* Fetch Joke Button */}
                <motion.button 
                    onClick={fetchData}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="mt-6 px-6 py-3 bg-pink-600 text-white font-semibold rounded-full shadow-lg hover:bg-pink-400 transition pulsate"
                >
                    🎭 Get a Joke
                </motion.button>
            </motion.div>

            {/* Custom Styles */}
            <style>
                {`
                .neon-glow {
                    box-shadow: 0 0 20px rgba(255, 0, 255, 0.5);
                    border: 1px solid rgba(255, 0, 255, 0.8);
                }
                .neon-text {
                    background: linear-gradient(90deg, #ff00ff, #00ffff);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .pulsate {
                    animation: pulse 1.5s infinite;
                }
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
                `}
            </style>
        </div>
    );
}

export default Jokes;
