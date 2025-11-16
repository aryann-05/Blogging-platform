import React, { useState } from 'react';
import './BlogList.css';

const BlogList = ({ blogs, onBlogUpdated, onBlogDeleted }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  // Filter and sort blogs
  const filteredBlogs = blogs
    .filter(blog => {
      const matchesFilter = filter === 'all' || blog.status === filter;
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'views':
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });

  const handleStatusToggle = async (blog) => {
    const newStatus = blog.status === 'published' ? 'draft' : 'published';
    
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/blogs/${blog._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ ...blog, status: newStatus })
      });

      if (response.ok) {
        const updatedBlog = await response.json();
        onBlogUpdated(updatedBlog);
      }
    } catch (error) {
      console.error('Error updating blog status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (blog) => {
    setBlogToDelete(blog);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!blogToDelete) return;

    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/blogs/${blogToDelete._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        onBlogDeleted(blogToDelete._id);
        setShowDeleteModal(false);
        setBlogToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  return (
    <div className="blog-list">
      <div className="blog-list-header">
        <h1>My Blogs</h1>
        <p>Manage and organize your blog posts</p>
      </div>

      {/* Controls */}
      <div className="blog-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-controls">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Blogs</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title A-Z</option>
            <option value="views">Most Views</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="blog-stats">
        <div className="stat-item">
          <span className="stat-number">{blogs.length}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{blogs.filter(b => b.status === 'published').length}</span>
          <span className="stat-label">Published</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{blogs.filter(b => b.status === 'draft').length}</span>
          <span className="stat-label">Drafts</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{blogs.reduce((sum, b) => sum + (b.views || 0), 0)}</span>
          <span className="stat-label">Total Views</span>
        </div>
      </div>

      {/* Blog List */}
      {filteredBlogs.length > 0 ? (
        <div className="blogs-grid">
          {filteredBlogs.map(blog => (
            <div key={blog._id} className="blog-card">
              {blog.featuredImage && (
                <div className="blog-image">
                  <img src={blog.featuredImage} alt={blog.title} />
                </div>
              )}
              
              <div className="blog-content">
                <div className="blog-header">
                  <h3 className="blog-title">{blog.title}</h3>
                  <div className="blog-meta">
                    <span className={`status ${blog.status}`}>
                      {blog.status}
                    </span>
                    <span className="date">{formatDate(blog.createdAt)}</span>
                  </div>
                </div>

                <p className="blog-excerpt">
                  {blog.excerpt || blog.content.substring(0, 120)}...
                </p>

                <div className="blog-details">
                  <div className="blog-tags">
                    {blog.tags && blog.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="tag">#{tag}</span>
                    ))}
                  </div>
                  
                  <div className="blog-stats-mini">
                    <span>{blog.views || 0} views</span>
                    <span>{getReadingTime(blog.content)} min read</span>
                  </div>
                </div>

                <div className="blog-actions">
                  <button
                    className="btn-edit"
                    onClick={() => window.open(`/blog/edit/${blog._id}`, '_blank')}
                  >
                    Edit
                  </button>
                  
                  <button
                    className={`btn-status ${blog.status}`}
                    onClick={() => handleStatusToggle(blog)}
                    disabled={loading}
                  >
                    {blog.status === 'published' ? 'Unpublish' : 'Publish'}
                  </button>
                  
                  <button
                    className="btn-view"
                    onClick={() => window.open(`/blog/${blog._id}`, '_blank')}
                  >
                    View
                  </button>
                  
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteClick(blog)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>
            {searchTerm || filter !== 'all' 
              ? 'No blogs found' 
              : 'No blogs yet'
            }
          </h3>
          <p>
            {searchTerm || filter !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Start creating your first blog post!'
            }
          </p>
          {!searchTerm && filter === 'all' && (
            <button 
              className="btn-primary"
              onClick={() => window.location.hash = '#create'}
            >
              Create Your First Blog
            </button>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Delete Blog</h3>
            <p>Are you sure you want to delete "{blogToDelete?.title}"?</p>
            <p className="warning">This action cannot be undone.</p>
            
            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => {
                  setShowDeleteModal(false);
                  setBlogToDelete(null);
                }}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="btn-delete-confirm"
                onClick={handleDeleteConfirm}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Deleting...
                  </>
                ) : (
                  'Delete Blog'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogList;