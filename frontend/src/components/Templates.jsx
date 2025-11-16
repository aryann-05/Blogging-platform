import React, { useState } from 'react';
import './Templates.css';

const Templates = ({ onTemplateSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const templates = [
    {
      id: 1,
      title: "How-To Guide",
      category: "tutorial",
      description: "Perfect for step-by-step tutorials and instructional content",
      preview: "A comprehensive guide to help your readers master a new skill or solve a problem.",
      content: `# How to [Your Topic Here]

## Introduction
Start with a brief introduction explaining what readers will learn and why it's important.

## What You'll Need
- List any prerequisites
- Tools or materials required
- Estimated time to complete

## Step-by-Step Instructions

### Step 1: [First Action]
Explain the first step in detail. Include any important tips or warnings.

### Step 2: [Next Action]
Continue with clear, actionable instructions.

### Step 3: [Following Action]
Keep each step focused and easy to follow.

## Troubleshooting
Address common issues readers might encounter:
- **Problem**: Solution
- **Problem**: Solution

## Conclusion
Summarize what readers have accomplished and suggest next steps or related topics.

## Additional Resources
- Link to related articles
- Recommended tools
- Further reading`,
      tags: ["tutorial", "guide", "how-to"]
    },
    {
      id: 2,
      title: "Product Review",
      category: "review",
      description: "Comprehensive template for reviewing products or services",
      preview: "An honest, detailed review to help your readers make informed decisions.",
      content: `# [Product Name] Review: Is It Worth Your Money?

## Quick Summary
**Rating**: ⭐⭐⭐⭐⭐ (X/5 stars)
**Best for**: Who this product is ideal for
**Price**: $XX
**Bottom line**: One-sentence verdict

## What Is [Product Name]?
Brief overview of the product and what it does.

## Key Features
- **Feature 1**: Description
- **Feature 2**: Description
- **Feature 3**: Description

## Pros and Cons

### Pros ✅
- What works well
- Another positive aspect
- Third advantage

### Cons ❌
- What could be improved
- Any limitations
- Areas for enhancement

## My Experience
Share your personal experience using the product. Be honest about both positives and negatives.

## Comparison with Alternatives
How does this product compare to similar options in the market?

## Who Should Buy This?
- **Perfect for**: Specific user types
- **Not ideal for**: Who might want to look elsewhere

## Final Verdict
Your overall recommendation and final thoughts.

**Would I recommend it?** Yes/No and why.`,
      tags: ["review", "product", "recommendation"]
    },
    {
      id: 3,
      title: "Personal Story",
      category: "personal",
      description: "Share your experiences and connect with readers through storytelling",
      preview: "A personal narrative that engages readers and shares meaningful insights.",
      content: `# [Your Story Title]

## The Beginning
Set the scene. Where were you? What was happening in your life?

## The Challenge
What obstacle, problem, or situation did you face? Make readers feel the tension.

## The Journey
Describe your experience:
- What you tried
- How you felt
- What you learned along the way

## The Turning Point
What changed everything? This is the climax of your story.

## The Resolution
How did things work out? What was the outcome?

## What I Learned
Share the insights and lessons from your experience:
- Key takeaway 1
- Key takeaway 2
- Key takeaway 3

## How This Changed Me
Reflect on how this experience shaped you or your perspective.

## Your Turn
Encourage readers to share their own experiences or apply your insights to their lives.`,
      tags: ["personal", "story", "experience"]
    },
    {
      id: 4,
      title: "List Article",
      category: "listicle",
      description: "Engaging list-format articles that are easy to read and share",
      preview: "A well-structured list that provides value and keeps readers engaged.",
      content: `# X [Topic] That Will [Benefit/Outcome]

## Introduction
Briefly introduce the topic and explain why this list matters to your readers.

## 1. [First Item]
**Why it matters**: Explanation
**How to use it**: Practical application
**Pro tip**: Extra insight

## 2. [Second Item]
**Why it matters**: Explanation
**How to use it**: Practical application
**Pro tip**: Extra insight

## 3. [Third Item]
**Why it matters**: Explanation
**How to use it**: Practical application
**Pro tip**: Extra insight

## 4. [Fourth Item]
**Why it matters**: Explanation
**How to use it**: Practical application
**Pro tip**: Extra insight

## 5. [Fifth Item]
**Why it matters**: Explanation
**How to use it**: Practical application
**Pro tip**: Extra insight

## Bonus: [Extra Item]
Something special for readers who made it to the end.

## Conclusion
Summarize the key points and encourage action.

## What's Your Favorite?
Ask readers to engage by sharing their thoughts in the comments.`,
      tags: ["list", "tips", "advice"]
    },
    {
      id: 5,
      title: "News Analysis",
      category: "news",
      description: "Analyze current events and provide thoughtful commentary",
      preview: "A balanced analysis of recent news with your unique perspective.",
      content: `# [News Event]: What It Means and Why It Matters

## What Happened?
Provide a clear, objective summary of the news event or development.

## The Background
Give readers context they need to understand the significance:
- Historical context
- Key players involved
- Previous related events

## Different Perspectives
Present multiple viewpoints on the issue:

### Perspective A
- Main arguments
- Supporting evidence
- Who holds this view

### Perspective B
- Main arguments
- Supporting evidence
- Who holds this view

## My Analysis
Share your thoughtful take on the situation:
- What this really means
- Potential implications
- Why it matters

## What Happens Next?
Discuss possible outcomes and future developments to watch for.

## The Bigger Picture
Connect this event to larger trends or themes.

## Your Thoughts
Encourage readers to share their perspectives and engage in discussion.`,
      tags: ["news", "analysis", "current-events"]
    },
    {
      id: 6,
      title: "Travel Guide",
      category: "travel",
      description: "Comprehensive travel guides for destinations you've visited",
      preview: "Everything readers need to know for an amazing trip to your featured destination.",
      content: `# The Ultimate Guide to [Destination]

## Why Visit [Destination]?
Start with what makes this place special and worth visiting.

## Best Time to Visit
- **Peak season**: When and why
- **Shoulder season**: Benefits and drawbacks
- **Off season**: What to expect

## Getting There
- **By air**: Airport information and flight tips
- **By land**: Transportation options
- **Getting around**: Local transportation

## Where to Stay
### Budget Options
- Hostels, budget hotels
- Average cost: $XX/night

### Mid-Range
- Recommended hotels/areas
- Average cost: $XX/night

### Luxury
- Premium accommodations
- Average cost: $XX/night

## What to Do
### Must-See Attractions
1. **[Attraction 1]**: Why it's worth visiting
2. **[Attraction 2]**: What to expect
3. **[Attraction 3]**: Tips for visiting

### Hidden Gems
- Local favorites tourists miss
- Off-the-beaten-path experiences

## Food & Drink
- **Must-try dishes**: Local specialties
- **Where to eat**: Restaurant recommendations
- **Food culture**: Dining customs to know

## Practical Tips
- **Budget**: Daily costs breakdown
- **Safety**: What to be aware of
- **Culture**: Customs and etiquette
- **Language**: Useful phrases

## Sample Itinerary
### Day 1
Morning, afternoon, and evening activities

### Day 2
Planned activities and timing

### Day 3
Suggested schedule

## Final Tips
Your best advice for making the most of the trip.`,
      tags: ["travel", "guide", "destination"]
    },
    {
      id: 7,
      title: "Opinion Piece",
      category: "opinion",
      description: "Express your views on important topics with compelling arguments",
      preview: "A well-reasoned opinion piece that presents your perspective on important issues.",
      content: `# Why I Believe [Your Position]

## The Issue at Hand
Clearly state the topic and why it's important to discuss.

## My Position
State your opinion clearly and confidently.

## The Evidence
Present your strongest arguments:

### Argument 1
- Supporting evidence
- Examples or data
- Why this matters

### Argument 2
- Supporting evidence
- Examples or data
- Why this matters

### Argument 3
- Supporting evidence
- Examples or data
- Why this matters

## Addressing Counterarguments
Acknowledge opposing views and explain why your position is stronger:

**"But what about..."**
Your response to common objections.

**"Some might argue..."**
How you address different perspectives.

## Real-World Implications
What would happen if your position were adopted? What are the stakes?

## Personal Connection
Why this issue matters to you personally.

## Call to Action
What do you want readers to do with this information?

## The Bottom Line
Restate your position and leave readers with something to think about.`,
      tags: ["opinion", "debate", "perspective"]
    },
    {
      id: 8,
      title: "Interview Article",
      category: "interview",
      description: "Structure for featuring interviews with interesting people",
      preview: "A compelling interview that reveals insights from your featured guest.",
      content: `# [Interview Title]: A Conversation with [Interviewee Name]

## Introduction
Introduce your interviewee and explain why readers should care about what they have to say.

**About [Name]**: Brief bio highlighting their expertise or achievements.

## The Conversation

### On [Topic 1]
**You**: Your question here?

**[Name]**: "Their response with specific quotes from the interview."

**You**: Follow-up question?

**[Name]**: "Their detailed response."

### On [Topic 2]
**You**: Your question about another topic?

**[Name]**: "Their insightful response."

### On [Topic 3]
**You**: Your question?

**[Name]**: "Their answer with specific details."

## Key Takeaways
Summarize the most important points from the conversation:
- Insight 1
- Insight 2
- Insight 3

## What's Next for [Interviewee]?
Information about their current projects or future plans.

## Connect with [Interviewee]
- Website: [URL]
- Social media: [Links]
- Current project: [Information]

## Final Thoughts
Your reflection on the conversation and what readers should remember.`,
      tags: ["interview", "conversation", "profile"]
    }
  ];

  const categories = [
    { value: 'all', label: 'All Templates' },
    { value: 'tutorial', label: 'Tutorials' },
    { value: 'review', label: 'Reviews' },
    { value: 'personal', label: 'Personal' },
    { value: 'listicle', label: 'Lists' },
    { value: 'news', label: 'News & Analysis' },
    { value: 'travel', label: 'Travel' },
    { value: 'opinion', label: 'Opinion' },
    { value: 'interview', label: 'Interviews' }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleUseTemplate = (template) => {
    if (onTemplateSelect) {
      onTemplateSelect({
        title: template.title.replace(/\[.*?\]/g, ''),
        content: template.content,
        category: template.category,
        tags: template.tags.join(', ')
      });
    }
  };

  return (
    <div className="templates">
      <div className="templates-header">
        <h1>Blog Templates</h1>
        <p>Choose from professionally crafted templates to kickstart your writing</p>
      </div>

      {/* Controls */}
      <div className="templates-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="category-filter">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="templates-grid">
          {filteredTemplates.map(template => (
            <div key={template.id} className="template-card">
              <div className="template-header">
                <h3>{template.title}</h3>
                <span className="template-category">{template.category}</span>
              </div>
              
              <p className="template-description">
                {template.description}
              </p>
              
              <div className="template-preview">
                <p>{template.preview}</p>
              </div>
              
              <div className="template-tags">
                {template.tags.map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
              
              <div className="template-actions">
                <button
                  className="btn-preview"
                  onClick={() => {
                    // Show preview modal or expand content
                    console.log('Preview template:', template);
                  }}
                >
                  Preview
                </button>
                <button
                  className="btn-use-template"
                  onClick={() => handleUseTemplate(template)}
                >
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No templates found</h3>
          <p>Try adjusting your search or category filter</p>
        </div>
      )}

      {/* Tips Section */}
      <div className="templates-tips">
        <h2>How to Use Templates</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <div className="tip-icon">🎯</div>
            <h4>Choose the Right Template</h4>
            <p>Select a template that matches your content type and audience expectations.</p>
          </div>
          
          <div className="tip-card">
            <div className="tip-icon">✏️</div>
            <h4>Customize for Your Voice</h4>
            <p>Adapt the template to match your writing style and personal brand.</p>
          </div>
          
          <div className="tip-card">
            <div className="tip-icon">📝</div>
            <h4>Fill in the Blanks</h4>
            <p>Replace placeholder text with your unique content and insights.</p>
          </div>
          
          <div className="tip-card">
            <div className="tip-icon">🔄</div>
            <h4>Make It Your Own</h4>
            <p>Don't be afraid to modify the structure to better serve your message.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;