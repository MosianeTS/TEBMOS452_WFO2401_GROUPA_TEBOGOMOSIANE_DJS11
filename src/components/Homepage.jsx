// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import PodcastCard from './Card';
// import './Homepage.css';

// const fetchPreview = async () => {
//   const response = await fetch('https://podcast-api.netlify.app');
//   if (!response.ok) {
//     throw new Error('Error: Could not fetch preview data');
//   }
//   return response.json();
// };

// export default function Homepage() {
//   const { id } = useParams();

//   let selectedGenre;
//   if (id) {
//     selectedGenre = parseInt(id);
//   } else {
//     selectedGenre = null;
//   }

//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sortOrder, setSortOrder] = useState('unordered');

//   useEffect(() => {

//     //function to fetch podcast data
//     const fetchData = async () => {
//       try {
//         const previewData = await fetchPreview();
//         setData(previewData);
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const filterByGenre = (items, genreId) => {
//     if (!genreId) return items;
//     return items.filter((item) => item.genres.includes(genreId));
//   };

//   //function to sort data
//   const sortData = (items, order) => {
//     switch (order) {
//       case 'title-ascending':
//         return items.sort((a, b) => a.title.localeCompare(b.title));
//       case 'title-descending':
//         return items.sort((a, b) => b.title.localeCompare(a.title));
//       case 'recently-updated':
//         return items.sort((a, b) => new Date(b.updated) - new Date(a.updated));
//       case 'oldest-updated':
//         return items.sort((a, b) => new Date(a.updated) - new Date(b.updated));
//       default:
//         return items;
//     }
//   };

//   const filteredData = filterByGenre(data, selectedGenre);
//   const sortedData = sortData(filteredData, sortOrder);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <div className="dropdown">
//         <select
//           className="select-box"
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value)}
//         >
//           <option value="unordered">Unordered</option>
//           <option value="title-ascending">Title A-Z</option>
//           <option value="title-descending">Title Z-A</option>
//           <option value="recently-updated">Newly Updated</option>
//           <option value="oldest-updated">Oldest Updated</option>
//         </select>
//       </div>
//       <section className="all-cards">
//         {sortedData.map((item) => (
//           <PodcastCard
//             key={item.id}
//             id={item.id}
//             title={item.title}
//             description={item.description}
//             genres={item.genres}
//             image={item.image}
//             url={item.url}
//             seasons={item.seasons}
//             updated={item.updated}
//           />
//         ))}
//       </section>
//     </div>
//   );
// }

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PodcastCard from './Card';
import './Homepage.css';

const fetchPreview = async () => {
  const response = await fetch('https://podcast-api.netlify.app');
  if (!response.ok) {
    throw new Error('Error: Could not fetch preview data');
  }
  return response.json();
};

export default function Homepage() {
  const { id } = useParams();

  let selectedGenre;
  if (id) {
    selectedGenre = parseInt(id);
  } else {
    selectedGenre = null;
  }

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('unordered');
  const [titleFilter, setTitleFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const previewData = await fetchPreview();
        setData(previewData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterByGenre = (items, genreId) => {
    if (!genreId) return items;
    return items.filter((item) => item.genres.includes(genreId));
  };

  const filterByTitle = (items, title) => {
    if (!title) return items;
    return items.filter((item) =>
      item.title.toLowerCase().includes(title.toLowerCase())
    );
  };

  const sortData = (items, order) => {
    switch (order) {
      case 'title-ascending':
        return items.sort((a, b) => a.title.localeCompare(b.title));
      case 'title-descending':
        return items.sort((a, b) => b.title.localeCompare(a.title));
      case 'recently-updated':
        return items.sort((a, b) => new Date(b.updated) - new Date(a.updated));
      case 'oldest-updated':
        return items.sort((a, b) => new Date(a.updated) - new Date(b.updated));
      default:
        return items;
    }
  };

  const filteredData = filterByTitle(
    filterByGenre(data, selectedGenre),
    titleFilter
  );
  const sortedData = sortData(filteredData, sortOrder);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="filter-controls">
        <div className="dropdown">
          <select
            className="select-box"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="unordered">Unordered</option>
            <option value="title-ascending">Title A-Z</option>
            <option value="title-descending">Title Z-A</option>
            <option value="recently-updated">Newly Updated</option>
            <option value="oldest-updated">Oldest Updated</option>
          </select>
        </div>
        <div className="title-filter">
          <input
            type="text"
            placeholder="Filter by title"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
          />
        </div>
      </div>
      <section className="all-cards">
        {sortedData.map((item) => (
          <PodcastCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            genres={item.genres}
            image={item.image}
            url={item.url}
            seasons={item.seasons}
            updated={item.updated}
          />
        ))}
      </section>
    </div>
  );
}

