import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import '../Styles/article.css';

const FilterableArticleList = () => {
    const [keyword, setKeyword] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [source, setSource] = useState('');
    const [author, setAuthor] = useState('');
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [articlesData, setArticlesData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/articles');
                // Handle the response data
                setArticlesData(response.data.data);
            } catch (error) {
                // Handle any errors that occurred during the request
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Filter articles based on keyword, date, category, source, and author
        const filtered = articlesData.filter(article => {
            const articleDate = new Date(article.date);
            return (
                article.title.toLowerCase().includes(keyword.toLowerCase()) &&
                (date === '' || articleDate.toISOString().startsWith(date)) &&
                (category === '' || article.category === category) &&
                (source === '' || article.source === source) &&
                (author === '' || article.author === author)
            );
        });
        setFilteredArticles(filtered);
    }, [articlesData, keyword, date, category, source, author]);

    return (
        <div className="articlecontainer">
            <h1>Welcome to the News Website!</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search articles by keyword"
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                />
            </div>

            <div>
                Date:
                <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
            </div>

            <div>
                Category:
                <select value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="">All</option>
                    <option value="Technology">Technology</option>
                    <option value="Sports">Sports</option>
                    <option value="Science">Science</option>
                    <option value="Business">Business</option>
                    <option value="Entertainment">Entertainment</option>
                    {/* Add more categories */}
                </select>
            </div>

            <div>
                Source:
                <select value={source} onChange={e => setSource(e.target.value)}>
                    <option value="">All</option>
                    <option value="Tech News">Tech News</option>
                    <option value="Sports Illustrated">Sports Illustrated</option>
                    <option value="Science Daily">Science Daily</option>
                    <option value="Financial Times">Financial Times</option>
                    <option value="Entertainment Weekly">Entertainment Weekly</option>
                    {/* Add more sources */}
                </select>
            </div>

            <div>
                Author:
                <select value={author} onChange={e => setAuthor(e.target.value)}>
                    <option value="">All</option>
                    <option value="John Doe">John Doe</option>
                    <option value="Jane Smith">Jane Smith</option>
                    <option value="Alex Johnson">Alex Johnson</option>
                    <option value="Emily Brown">Emily Brown</option>
                    {/* Add more authors */}
                </select>
            </div>

            <h2>News Feed</h2>

            <Link to="/news">Top News</Link>
            
            {filteredArticles.length > 0 ? (
                <ul>
                    {filteredArticles.map(article => (
                        <li key={article.id}>
                            <h3>{article.title}</h3>
                            <p>{article.content}</p>
                            <p>Date: {article.date}</p>
                            <p>Category: {article.category}</p>
                            <p>Source: {article.source}</p>
                            <p>Author: {article.author}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-articles">No articles found.</p>
            )}
        </div>
    );
};

export default FilterableArticleList;
