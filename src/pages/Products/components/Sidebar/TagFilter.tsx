interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onToggle: (tag: string) => void;
}

const TagFilter = ({ tags, selectedTags, onToggle }: TagFilterProps) => {
  return (
    <div className="widget_list tag-cloud">
      <h2>Popular Tags</h2>
      <div className="tag_widget">
        <ul>
          {tags.map((tag) => (
            <li key={tag}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onToggle(tag);
                }}
                style={{
                  fontWeight: selectedTags.includes(tag) ? "bold" : "normal",
                  backgroundColor: selectedTags.includes(tag)
                    ? "#ff4136"
                    : undefined,
                  color: selectedTags.includes(tag) ? "#fff" : undefined,
                }}
              >
                {tag}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TagFilter;
