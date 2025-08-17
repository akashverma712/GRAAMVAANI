import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { parseISO, format } from 'date-fns';
import { FaCalendarAlt } from 'react-icons/fa';

const eventsData = [
	{
		id: 1,
		title: 'Gram Sabha Meeting',
		date: '2025-07-25',
		description: 'Monthly Gram Sabha for discussing local development issues.',
		category: 'Community',
	}
	
];

const categories = ['All', ...new Set(eventsData.map((e) => e.category))];
const dates = [...new Set(eventsData.map((e) => e.date))];

const EventCalendar = () => {
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [selectedDate, setSelectedDate] = useState('');
	const [searchTerm, setSearchTerm] = useState('');

	const filteredEvents = eventsData.filter((event) => {
		const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;

		const matchesDate = selectedDate === '' || event.date === selectedDate;

		const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());

		return matchesCategory && matchesDate && matchesSearch;
	});

	return (
		<motion.section
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="max-w-5xl mx-auto px-4 py-10">
			<h2 className="text-3xl font-bold text-green-700 flex items-center gap-2 mb-6">
				<FaCalendarAlt />
				Event Calendar
			</h2>

			<div className="grid md:grid-cols-3 gap-4 mb-6">
				<div>
					<label className="block text-sm font-medium mb-1 text-gray-600">Category</label>
					<select
						value={selectedCategory}
						onChange={(e) => setSelectedCategory(e.target.value)}
						className="w-full border rounded p-2">
						{categories.map((cat) => (
							<option key={cat}>{cat}</option>
						))}
					</select>
				</div>

				<div>
					<label className="block text-sm font-medium mb-1 text-gray-600">Date</label>
					<select
						value={selectedDate}
						onChange={(e) => setSelectedDate(e.target.value)}
						className="w-full border rounded p-2">
						<option value="">All Dates</option>
						{dates.map((d) => (
							<option
								key={d}
								value={d}>
								{format(parseISO(d), 'dd MMM yyyy')}
							</option>
						))}
					</select>
				</div>

				<div>
					<label className="block text-sm font-medium mb-1 text-gray-600">Search</label>
					<input
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="Search by title..."
						className="w-full border rounded p-2"
					/>
				</div>
			</div>

			{/* Event List */}
			<motion.div
				layout
				className="space-y-4">
				{filteredEvents.length > 0 ? (
					filteredEvents.map((event) => (
						<motion.div
							key={event.id}
							initial={{ opacity: 0, y: 15 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
							className="border-l-4 border-green-600 hover:bg-green-100 transition-all bg-white shadow rounded p-4">
							<h3 className="text-xl font-semibold text-green-700">{event.title}</h3>
							<p className="text-sm text-gray-500 mb-1">
								{format(parseISO(event.date), 'do MMMM yyyy')} • {event.category}
							</p>
							<p className="text-gray-700">{event.description}</p>
						</motion.div>
					))
				) : (
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="text-gray-500 text-center mt-6">
						No events match your filters.
					</motion.p>
				)}
			</motion.div>
		</motion.section>
	);
};

export default EventCalendar;
