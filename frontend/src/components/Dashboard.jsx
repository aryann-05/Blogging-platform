import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/Authcontext';
import CreateBlog from '../components/CreateBlog';
import BlogList from '../components/BlogList';
import Templates from '../components/Templates'; // Added back import since Templates.jsx exists now
import './Dashboard.css';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [blogs, setBlogs] = useState([]);
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    totalViews: 0
  });
  const [loading, setLoading] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchDashboardData();
  }, [isAuthenticated, navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      await fetchBlogs();
      await fetchStats();
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/blogs/user/${user?.userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/blogs/stats/${user?.userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Set default stats if API fails
      setStats({
        totalBlogs: blogs.length,
        publishedBlogs: blogs.filter(blog => blog.status === 'published').length,
        draftBlogs: blogs.filter(blog => blog.status === 'draft').length,
        totalViews: blogs.reduce((sum, blog) => sum + (blog.views || 0), 0)
      });
    }
  };

  const handleBlogCreated = (newBlog) => {
    setBlogs(prev => [newBlog, ...prev]);
    setActiveTab('blogs');
    fetchStats(); // Refresh stats
  };

  const handleBlogUpdated = (updatedBlog) => {
    setBlogs(prev => prev.map(blog => 
      blog._id === updatedBlog._id ? updatedBlog : blog
    ));
    fetchStats(); // Refresh stats
  };

  const handleBlogDeleted = (deletedBlogId) => {
    setBlogs(prev => prev.filter(blog => blog._id !== deletedBlogId));
    fetchStats(); // Refresh stats
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-header">
            <h3>Dashboard</h3>
            <p>Welcome back, {user?.username}!</p>
          </div>
          
          <nav className="sidebar-nav">
            <button
              className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <span className="nav-icon">📊</span>
              Overview
            </button>
            
            <button
              className={`nav-item ${activeTab === 'create' ? 'active' : ''}`}
              onClick={() => setActiveTab('create')}
            >
              <span className="nav-icon">✍️</span>
              Create Blog
            </button>
            
            <button
              className={`nav-item ${activeTab === 'blogs' ? 'active' : ''}`}
              onClick={() => setActiveTab('blogs')}
            >
              <span className="nav-icon">📝</span>
              My Blogs
              <span className="nav-badge">{blogs.length}</span>
            </button>
            
            <button
              className={`nav-item ${activeTab === 'templates' ? 'active' : ''}`}
              onClick={() => setActiveTab('templates')}
            >
              <span className="nav-icon">📋</span>
              Templates
            </button>
          </nav>

          <div className="sidebar-footer">
            <div className="quick-stats">
              <div className="quick-stat">
                <span className="stat-number">{stats.totalBlogs}</span>
                <span className="stat-label">Total Blogs</span>
              </div>
              <div className="quick-stat">
                <span className="stat-number">{stats.totalViews}</span>
                <span className="stat-label">Total Views</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          {activeTab === 'overview' && (
            <div className="dashboard-overview">
              <div className="overview-header">
                <h1>Dashboard Overview</h1>
                <p>Here's what's happening with your blogs</p>
              </div>

              {/* Stats Cards */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">📝</div>
                  <div className="stat-content">
                    <h3>{stats.totalBlogs}</h3>
                    <p>Total Blogs</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">🌟</div>
                  <div className="stat-content">
                    <h3>{stats.publishedBlogs}</h3>
                    <p>Published</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">📄</div>
                  <div className="stat-content">
                    <h3>{stats.draftBlogs}</h3>
                    <p>Drafts</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">👀</div>
                  <div className="stat-content">
                    <h3>{stats.totalViews}</h3>
                    <p>Total Views</p>
                  </div>
                </div>
              </div>

              {/* Recent Blogs */}
              <div className="recent-blogs">
                <div className="section-header">
                  <h2>Recent Blogs</h2>
                  <button 
                    className="btn-secondary"
                    onClick={() => setActiveTab('blogs')}
                  >
                    View All
                  </button>
                </div>
                
                {blogs.length > 0 ? (
                  <div className="recent-blogs-list">
                    {blogs.slice(0, 3).map(blog => (
                      <div key={blog._id} className="recent-blog-item">
                        <div className="blog-meta">
                          <h4>{blog.title}</h4>
                          <p>{blog.excerpt || blog.content.substring(0, 100)}...</p>
                          <div className="blog-stats">
                            <span className={`status ${blog.status}`}>
                              {blog.status}
                            </span>
                            <span className="views">{blog.views || 0} views</span>
                            <span className="date">
                              {new Date(blog.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">📝</div>
                    <h3>No blogs yet</h3>
                    <p>Start creating your first blog post!</p>
                    <button 
                      className="btn-primary"
                      onClick={() => setActiveTab('create')}
                    >
                      Create Your First Blog
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="quick-actions">
                <h2>Quick Actions</h2>
                <div className="actions-grid">
                  <button 
                    className="action-card"
                    onClick={() => setActiveTab('create')}
                  >
                    <div className="action-icon">✍️</div>
                    <h4>Write New Blog</h4>
                    <p>Start writing your next blog post</p>
                  </button>

                  <button 
                    className="action-card"
                    onClick={() => setActiveTab('templates')}
                  >
                    <div className="action-icon">📋</div>
                    <h4>Browse Templates</h4>
                    <p>Get inspiration from our templates</p>
                  </button>

                  <button 
                    className="action-card"
                    onClick={() => setActiveTab('blogs')}
                  >
                    <div className="action-icon">📊</div>
                    <h4>Manage Blogs</h4>
                    <p>Edit and organize your content</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'create' && (
            <CreateBlog onBlogCreated={handleBlogCreated} />
          )}

          {activeTab === 'blogs' && (
            <BlogList 
              blogs={blogs}
              onBlogUpdated={handleBlogUpdated}
              onBlogDeleted={handleBlogDeleted}
            />
          )}

          {activeTab === 'templates' && (
            <Templates onTemplateSelect={(template) => {
              setActiveTab('create');
              // Pass template data to CreateBlog component
            }} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;