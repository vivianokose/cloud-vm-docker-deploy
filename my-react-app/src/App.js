import React from 'react';
import './App.css';

function App() {
  return (
    <div style={{fontFamily:'Arial,sans-serif',maxWidth:'800px',margin:'60px auto',padding:'40px',backgroundColor:'#f0f4f8',borderRadius:'12px',boxShadow:'0 4px 20px rgba(0,0,0,0.1)',textAlign:'center'}}>
      <h1 style={{color:'#1F4E79',fontSize:'2.2rem',marginBottom:'10px'}}>
        Welcome to My React App
      </h1>
      <p style={{fontSize:'1.2rem',color:'#2E75B6',marginBottom:'30px'}}>
        This app is running on Nginx!
      </p>
      <div style={{backgroundColor:'#ffffff',borderRadius:'8px',padding:'30px',marginBottom:'30px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
        <p style={{fontSize:'1.1rem',color:'#333',marginBottom:'10px'}}>
          <strong>Deployed by:</strong> Vivian Chiamaka Okose
        </p>
        <p style={{fontSize:'1.1rem',color:'#333'}}>
          <strong>Date:</strong> 17/04/2026
        </p>
      </div>
      <div style={{backgroundColor:'#E8F4FD',borderRadius:'8px',padding:'24px',marginBottom:'20px'}}>
        <p style={{fontSize:'1rem',color:'#444',marginBottom:'12px'}}>
          This project is part of the <strong>FREE DevOps for Beginners Cohort</strong> run by Pravin Mishra.
        </p>
        <p style={{fontSize:'1rem',color:'#444',marginBottom:'16px'}}>
          You can start your DevOps journey for free from his YouTube Playlist.
        </p>
        <a href="https://www.linkedin.com/in/pravin-mishra-aws-trainer/" target="_blank" rel="noopener noreferrer" style={{display:'inline-block',backgroundColor:'#0077B5',color:'#ffffff',padding:'10px 24px',borderRadius:'6px',textDecoration:'none',fontWeight:'bold',fontSize:'0.95rem'}}>
          Connect with Pravin on LinkedIn
        </a>
      </div>
      <p style={{fontSize:'0.85rem',color:'#888',marginTop:'20px'}}>
        Deployed with Docker + Nginx on Microsoft Azure
      </p>
    </div>
  );
}

export default App;
