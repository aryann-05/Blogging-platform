import React, { useState, useEffect } from 'react';
import './CreateBlog.css';

const CreateBlog = ({ onBlogCreated, editingBlog = null }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    status: 'draft',
    category: '',
    featuredImage: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  // Categories for blog posts
  const categories = [
    'Technology',
    'Lifestyle',
    'Travel',
    'Food',
    'Health & Fitness',
    'Business',
    'Education',
    'Entertainment',
    'Fashion',
    'Sports',
    'Politics',
    'Science',
    'Art & Design',
    'Photography',
    'Music',
    'Other'
  ];

  // Load editing blog data
  useEffect(() => {
    if (editingBlog) {
      setFormData({
        title: editingBlog.title || '',
        content: editingBlog.content || '',
        excerpt: editingBlog.excerpt || '',
        tags: editingBlog.tags ? editingBlog.tags.join(', ') : '',
        status: editingBlog.status || 'draft',
        category: editingBlog.category || '',
        featuredImage: editingBlog.featuredImage || ''
      });
    }
  }, [editingBlog]);

  // Update word count when content changes
  useEffect(() => {
    const words = formData.content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [formData.content]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-generate excerpt from content if not manually set
    if (name === 'content' && !formData.excerpt) {
      const autoExcerpt = value.substring(0, 150).trim();
      setFormData(prev => ({
        ...prev,
        excerpt: autoExcerpt
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!formData.title.trim() || !formData.content.trim()) {
      setMessage('Title and content are required');
      return;
    }

    setLoading(true);

    try {
      const blogData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        author: user.userId,
        wordCount: wordCount
      };

      const url = editingBlog 
        ? `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/blogs/${editingBlog._id}`
        : `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/blogs`;
      
      const method = editingBlog ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(blogData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Blog ${editingBlog ? 'updated' : 'created'} successfully!`);
        
        if (!editingBlog) {
          // Reset form only for new blogs
          setFormData({
            title: '',
            content: '',
            excerpt: '',
            tags: '',
            status: 'draft',
            category: '',
            featuredImage: ''
          });
        }

        if (onBlogCreated) {
          onBlogCreated(data);
        }
      } else {
        setMessage(data.message || `Failed to ${editingBlog ? 'update' : 'create'} blog`);
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      setMessage('An error occurred while saving the blog');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = () => {
    setFormData(prev => ({ ...prev, status: 'draft' }));
    setTimeout(() => {
      document.querySelector('.create-blog-form').requestSubmit();
    }, 100);
  };

  const handlePublish = () => {
    setFormData(prev => ({ ...prev, status: 'published' }));
    setTimeout(() => {
      document.querySelector('.create-blog-form').requestSubmit();
    }, 100);
  };

  return (
    <div className="create-blog">
      <div className="create-blog-header">
        <h1>{editingBlog ? 'Edit Blog' : 'Create New Blog'}</h1>
        <p>Share your thoughts with the world</p>
      </div>

      {message && (
        <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="create-blog-container">
        <div className="create-blog-main">
          <form onSubmit={handleSubmit} className="create-blog-form">
            {/* Title */}
            <div className="form-group">
              <label htmlFor="title">Blog Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter your blog title..."
                disabled={loading}
                required
              />
            </div>

            {/* Category and Featured Image */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="featuredImage">Featured Image URL</label>
                <input
                  type="url"
                  id="featuredImage"
                  name="featuredImage"
                  value={formData.featuredImage}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Excerpt */}
            <div className="form-group">
              <label htmlFor="excerpt">Excerpt</label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Brief description of your blog post..."
                rows="3"
                disabled={loading}
              />
              <small className="form-help">
                A short summary that will appear in blog previews
              </small>
            </div>

            {/* Content */}
            <div className="form-group">
              <div className="content-header">
                <label htmlFor="content">Content *</label>
                <div className="content-stats">
                  <span className="word-count">{wordCount} words</span>
                  <button
                    type="button"
                    className="preview-toggle"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    {showPreview ? 'Edit' : 'Preview'}
                  </button>
                </div>
              </div>

              {showPreview ? (
                <div className="content-preview">
                  <div className="preview-content" dangerouslySetInnerHTML={{
                    __html: formData.content.replace(/\n/g, '<br>')
                  }} />
                </div>
              ) : (
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Start writing your blog content here...

You can use:
- **Bold text**
- *Italic text*
- Line breaks for paragraphs
- Lists and more!"
                  rows="15"
                  disabled={loading}
                  required
                />
              )}
            </div>

            {/* Tags */}
            <div className="form-group">
              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="technology, programming, web development"
                disabled={loading}
              />
              <small className="form-help">
                Separate tags with commas. This helps readers find your content.
              </small>
            </div>

            {/* Action Buttons */}
            <div className="form-actions">
              <button
                type="button"
                className="btn-draft"
                onClick={handleSaveDraft}
                disabled={loading}
              >
                {loading && formData.status === 'draft' ? (
                  <>
                    <span className="spinner"></span>
                    Saving Draft...
                  </>
                ) : (
                  'Save as Draft'
                )}
              </button>

              <button
                type="button"
                className="btn-publish"
                onClick={handlePublish}
                disabled={loading || !formData.title.trim() || !formData.content.trim()}
              >
                {loading && formData.status === 'published' ? (
                  <>
                    <span className="spinner"></span>
                    Publishing...
                  </>
                ) : (
                  editingBlog ? 'Update Blog' : 'Publish Blog'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar with Tips */}
        <div className="create-blog-sidebar">
          <div className="tips-card">
            <h3>Writing Tips</h3>
            <ul>
              <li>📝 Start with a compelling title</li>
              <li>🎯 Keep your audience in mind</li>
              <li>📖 Use short paragraphs for readability</li>
              <li>🔗 Add relevant tags for discoverability</li>
              <li>🖼️ Include a featured image if possible</li>
              <li>✨ Write an engaging excerpt</li>
            </ul>
          </div>

          <div className="quick-stats-card">
            <h3>Blog Stats</h3>
            <div className="stats">
              <div className="stat">
                <span className="stat-number">{wordCount}</span>
                <span className="stat-label">Words</span>
              </div>
              <div className="stat">
                <span className="stat-number">{Math.ceil(wordCount / 200)}</span>
                <span className="stat-label">Min Read</span>
              </div>
              <div className="stat">
                <span className="stat-number">{formData.tags.split(',').filter(tag => tag.trim()).length}</span>
                <span className="stat-label">Tags</span>
              </div>
            </div>
          </div>

          <div className="formatting-help">
            <h3>Formatting Help</h3>
            <div className="format-examples">
              <div className="format-item">
                <strong>**Bold text**</strong>
                <span>for emphasis</span>
              </div>
              <div className="format-item">
                <em>*Italic text*</em>
                <span>for style</span>
              </div>
              <div className="format-item">
                <code>`Code text`</code>
                <span>for code snippets</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;