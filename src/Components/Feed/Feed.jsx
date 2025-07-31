import React, { useEffect, useState } from 'react';
import './Feed.css';
import { API_KEY } from '../../data';
import { Link } from 'react-router-dom';
import moment from 'moment';

// 👇 Add this utility function here
const value_converter = (value) => {
  if (!value) return '0';
  const val = parseInt(value, 10);
  if (val >= 1_000_000) return (val / 1_000_000).toFixed(1) + 'M';
  if (val >= 1_000) return (val / 1_000).toFixed(1) + 'K';
  return val.toString();
};

const Feed = ({ category }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
    await fetch(videoList_url)
      .then((response) => response.json())
      .then((data) => setData(data.items));
  };

useEffect(() => {
  fetchData();
}, [category]);



  return (
    <div className="feed">
      {data.map((item) => (
        <Link
          key={item.id}
          to={`/video/${category}/${item.id}`}
          className="card"
        >
          <img src={item.snippet.thumbnails.medium.url} alt="" />
          <h2>{item.snippet.title}</h2>
          <h3>{item.snippet.channelTitle}</h3>
          <p>
            {value_converter(item.statistics.viewCount)} views &bull;{' '}
            {moment(item.snippet.publishedAt).fromNow()}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Feed;



// import React, { useEffect, useState } from 'react';
// import './Feed.css'
// import { API_KEY } from '../../data'
// import { Link } from 'react-router-dom'
// import moment from 'moment';



// const Feed = ({category}) => {
//   const [data, setData] =useState([]);

// const fetchData = async () =>{
//   const videoList_url =`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`
//   await fetch(videoList_url).then(response=>response.json()).then(data=>setData(data.items))
// }

// useEffect(()=>{
//   fetchData();
// },[category])



//   return (
//     <div className="feed">
//       {data.map((item,index)=>{
//         return(
//     <Link to={`video/${item.snippet.categoryId}/${item.id}`} className='card'>
//       <img src={item.snippet.thumbnails.medium.url} alt="" />
//       <h2>{item.snippet.title}</h2>
//           <h3>{item.snippet.channelTitle}</h3>
//           <p>{item.statistics?.viewCount} views • {moment(item.snippet.publishedAt).fromNow()}</p>

//           <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>

          
//     </Link>
//         )
//       })}
    
    
//     </div>
//   )
// }

// export default Feed

// // import React, { useState, useEffect } from 'react';
// // import './Feed.css';
// // import { API_KEY } from '../../data';

// // const Feed = ({ category = '10' }) => {
// //   const [data, setData] = useState([]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=10&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
// //         const response = await fetch(videoList_url);
// //         const result = await response.json();
// //         console.log('Fetched data:', result);
// //         if (result.items) {
// //           setData(result.items);
// //         } else {
// //           console.warn('No items returned, falling back to mock data');
// //           setData([
// //             {
// //               id: 'mock1',
// //               snippet: {
// //                 title: 'Mock Video Title',
// //                 channelTitle: 'Mock Channel',
// //                 thumbnails: {
// //                   medium: {
// //                     url: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
// //                   },
// //                 },
// //               },
// //               statistics: {
// //                 viewCount: '999999',
// //               },
// //             },
// //           ]);
// //         }
// //       } catch (error) {
// //         console.error('API error:', error);
// //       }
// //     };

// //     fetchData();
// //   }, [category]);

// //   return (
// //     <div className="feed">
// //       <h3>📡 Live Data or Fallback</h3>
// //       {data.map((item) => (
// //         <div key={item.id}>
// //           <img src={item.snippet.thumbnails.medium.url} />
// //           <h4>{item.snippet.title}</h4>
// //           <p>{item.snippet.channelTitle}</p>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default Feed;
