import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/news.css';

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [headlinesData, setHeadlinesData] = useState([]);
  const [storiesData, setStoriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from The Guardian API, NewsAPI.org API, and New York Times API
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axios.get(
          'https://content.guardianapis.com/search?api-key=3972b290-0458-42f9-b137-8a3a2e6b08af'
        );
        setNewsData(response?.data?.response?.results);
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    const fetchHeadlinesData = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/top-headlines?country=us&apiKey=70971cb08afc475594d69d69cec45268'
        );
        setHeadlinesData(response?.data?.articles);
      } catch (error) {
        console.error('Error fetching headlines data:', error);
      }
    };

    const fetchStoriesData = async () => {
      try {
        const response = await axios.get(
          'https://api.nytimes.com/svc/topstories/v2/us.json?api-key=SI4pA6HGeQILlf91nqhxskLeABueVNLH'
        );
        setStoriesData(response?.data?.results);
      } catch (error) {
        console.error('Error fetching stories data:', error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchNewsData(), fetchHeadlinesData(), fetchStoriesData()]);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>News</h1>
      {isLoading ? (
        <p class="grid-loader">Loading...</p>
      ) : (
        <div class="grid-container">
          <div class="section section-guardian">
            <h3>The Guardian News</h3>
            <ul>
              {newsData.map((article) => (
                <li key={article.id}>
                  <h3>{article.webTitle}</h3>
                  <p>Section: {article.sectionName}</p>
                  <p>Published Date: {article.webPublicationDate}</p>
                </li>
              ))}
            </ul>
          </div>
          <div class="section section-news-api">
            <h3>Top Headlines</h3>
            <ul>
              {headlinesData.map((article) => (
                <li key={article.title}>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <p>Source: {article.source.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div class="section section-ny-times">
            <h3>Top Stories (New York Times)</h3>
            <ul>
              {storiesData.map((story) => (
                <li key={story.title}>
                  <h3>{story.title}</h3>
                  <p>{story.abstract}</p>
                  <p>Published Date: {story.published_date}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
