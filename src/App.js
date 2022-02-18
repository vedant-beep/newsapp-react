import './App.css';
import React, { Component, useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = ()=> {
  const pageSize = 6;
  const apiKey = process.env.REACT_APP_NEWS_API_KEY
  const [progress, setProgress] = useState(0);
  const showProgress = (progress)=>{
    setProgress(progress);
  }
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
            <Route exact path="/" element={<News apiKey={apiKey} setProgress={showProgress}  key="general" pageSize={pageSize} country="in" category="general" />} />
            <Route exact path="/business" element={<News apiKey={apiKey} setProgress={showProgress}  key="business" pageSize={pageSize} country="in" category="business" />} />
            <Route exact path="/entertainment" element={<News apiKey={apiKey} setProgress={showProgress}  key="entertainment" pageSize={pageSize} country="in" category="entertainment" />} />
            <Route exact path="/health" element={<News apiKey={apiKey} setProgress={showProgress}  key="health" pageSize={pageSize} country="in" category="health" />} />
            <Route exact path="/science" element={<News apiKey={apiKey} setProgress={showProgress}  key="science" pageSize={pageSize} country="in" category="science" />} />
            <Route exact path="/sports" element={<News apiKey={apiKey} setProgress={showProgress}  key="sports" pageSize={pageSize} country="in" category="sports" />} />
            <Route exact path="/technology" element={<News apiKey={apiKey} setProgress={showProgress}  key="technology" pageSize={pageSize} country="in" category="technology" />} />
          </Routes>
        </Router>
        
      </div>
    )
}
export default App