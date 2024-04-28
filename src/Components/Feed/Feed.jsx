
// import React, { useEffect, useState } from "react";
// import "./Feed.css";
// import thumbnail1 from "../../assets/thumbnail1.png";
// import thumbnail2 from "../../assets/thumbnail2.png";
// import thumbnail3 from "../../assets/thumbnail3.png";
// import thumbnail4 from "../../assets/thumbnail4.png";
// import thumbnail5 from "../../assets/thumbnail5.png";
// import thumbnail6 from "../../assets/thumbnail6.png";
// import thumbnail7 from "../../assets/thumbnail7.png";
// import thumbnail8 from "../../assets/thumbnail8.png";
// import { Link } from "react-router-dom";
// import { API_KEY } from "../../data";
// const Feed = (category) => {
//     const [data,setData]=useState([]);
//     const fetchData =async ()=>{
//         const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
//         await fetch(videoList_url).then(response=>response.json()).then(data=>setData(data.items)).catch(error => console.error("Error fetching data:", error));
//     }
//     useEffect(()=>{
//         fetchData();
//     },[category])
//     return (
//         <div className="feed">
//             {data && data.map((item,index)=>{
//                 return(
//                     <Link key={index} to={`video/20/4521`} className="card">
//                         <img src={thumbnail1} alt="" />
//                         <h2>
//                             Best channel to learn coding that help you to be a web developer
//                         </h2>
//                         <h3>Greatstack</h3>
//                         <p>15k views &bull; 2 days ago</p>
//                     </Link>
//                 )
//             })}
            
//         </div>
//     );
// };

// export default Feed;

import React, { useEffect, useState } from "react";
import "./Feed.css";
import thumbnail1 from "../../assets/thumbnail1.png";
import { Link } from "react-router-dom";
import { API_KEY,value_converter} from "../../data";
import moment from "moment";
const Feed = ({ category }) => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
        await fetch(videoList_url)
            .then(response => response.json())
            .then(data => setData(data.items))
            .catch(error => console.error("Error fetching data:", error));

    };

    useEffect(() => {
        fetchData();
    }, [category]);

    return (
        <div className="feed">
            {data && data.map((item, index) => (
                <Link key={index} to={`video/${item.snippet.categoryId}/${item.id}`} className="card">
                    <img src={item.snippet.thumbnails.medium.url} alt="" />
                    <h2>{item.snippet.title}</h2>
                    <h3>{item.snippet.channelTitle}</h3>
                    <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                </Link>
            ))}
        </div>
    );
};

export default Feed;

