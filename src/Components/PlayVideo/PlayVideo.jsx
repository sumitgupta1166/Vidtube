
import React, { useEffect, useState } from 'react';
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const PlayVideo = () => {
    const { videoId } = useParams();
    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);

    const fetchVideoData = async () => {
        try {
            const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
            const response = await fetch(videoDetails_url);
            if (!response.ok) {
                throw new Error('Failed to fetch video data');
            }
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                setApiData(data.items[0]);
            } else {
                setApiData(null);
            }
        } catch (error) {
            setApiData(null);
        }
    };

    const fetchOtherData = async () => {
        try {
            if (!apiData) return; // Check if apiData is available

            const channelData_url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${apiData.snippet.channelId}&key=${API_KEY}`;
            const channelResponse = await fetch(channelData_url);
            const channelData = await channelResponse.json();
            setChannelData(channelData.items[0]);

            const comment_url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}`;
            const commentResponse = await fetch(comment_url);
            const commentData = await commentResponse.json();
            setCommentData(commentData.items);
        } catch (error) {
            console.error('Error fetching other data:', error);
        }
    };

    useEffect(() => {
        fetchVideoData();
    }, [videoId]);

    useEffect(() => {
        if (apiData) {
            fetchOtherData();
        }
    }, [apiData]);

    return (
        <div className='play-video'>
            {apiData && (
                <>
                        <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin" // Corrected attribute name
                        allowFullScreen
                        ></iframe>
                    <h3>{apiData.snippet.title}</h3>
                    <div className="play-video-info">
                        <p>
                            {value_converter(apiData.statistics.viewCount)} Views &bull;{' '}
                            {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ''}
                        </p>
                        <div>
                            <span>
                                <img src={like} alt="" />
                                {apiData ? value_converter(apiData.statistics.likeCount) : 155}
                            </span>
                            <span>
                                <img src={dislike} alt="" />
                                2
                            </span>
                            <span>
                                Share
                            </span>
                            <span>
                                Save
                            </span>
                        </div>
                    </div>
                </>
            )}
            <hr />
                <div className="publisher">
                <img
                    src={channelData ? channelData.snippet.thumbnails.default.url : ""}
                    alt=""
                />
                <div>
                    <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
                    <span>
                        {channelData && channelData.statistics
                            ? value_converter(channelData.statistics.subscriberCount)
                            : "1M"}{" "}
                        subscribers
                    </span>
                </div>
                <button>Subscribe</button>
                </div>   
            <div className="vid-description">
            <p>
                     {apiData
                        ? apiData.snippet.description.slice(0, 250)
                        : "Description Here"}
                </p>
                
                <hr />
                <h4>{commentData.length} Comments</h4>
                {commentData.map((item, index) => (
                    <div key={index} className="comment">
                        <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                        <div>
                            <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
                            <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                            <div className="comment-action">
                                <img src={like} alt="" />
                                <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                                <img src={dislike} alt="" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlayVideo;
