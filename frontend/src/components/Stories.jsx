import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserCircle } from 'react-icons/fa';

const stories = [
  {
    id: 1,
    name: 'Ravi Kumar',
    village: 'Rampur',
    title: 'Organic Farming Success',
    description:
      'Ravi transformed his 2-acre land into a profitable organic farm, increasing income by 60%.',
    image: 'https://avatars.mds.yandex.net/i?id=39715e1d4a865f728df20ea8b795c5dbdeef336d-12496730-images-thumbs&n=13',
  },
  {
    id: 2,
    name: 'Sita Devi',
    village: 'Lakhanpur',
    title: 'Women Self Help Group',
    description:
      'Led a group of 20 women to start a handicraft business, creating jobs and economic independence.',
    image: 'https://avatars.mds.yandex.net/i?id=c2a8aedcc82d1f6a2b348eee69ccc3de5270f8de-5014298-images-thumbs&n=13',
  },
  {
    id: 3,
    name: 'Mohit Singh',
    village: 'Dharampur',
    title: 'Digital Literacy Advocate',
    description:
      'Started a free computer class for kids and adults in the village using old laptops.',
    image: 'https://avatars.mds.yandex.net/i?id=d6ad55ba19099f6086fa06828f3cb263c1e3b176-5451642-images-thumbs&n=13',
  },
];

const Stories = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-green-700 mb-8"> Success Story Wall</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {stories.map((story, index) => (
          <motion.div
            key={story.id}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden cursor-pointer"
            onClick={() => setSelected(story)}
          >
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-green-800">{story.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                by {story.name} from {story.village}
              </p>
              <p className="text-gray-700 mt-2 line-clamp-3">{story.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {selected && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelected(null)}
        >
          <motion.div
            className="bg-white rounded-xl max-w-md w-full p-6 relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selected.image}
              alt={selected.title}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-2xl font-bold mt-4 text-green-800">{selected.title}</h3>
            <p className="text-sm text-gray-600 mb-1">
              by {selected.name} from {selected.village}
            </p>
            <p className="text-gray-700 mt-2">{selected.description}</p>
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl"
            >
              &times;
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Stories;
