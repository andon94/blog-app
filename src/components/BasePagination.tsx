import { useNavigate } from "react-router-dom";
import { ArticleLink, ArticlesResponse } from "../interfaces/articles";
import styles from "./BasePagination.module.scss";

const BasePagination = ({
  links = [],
  current_page,
  last_page,
}: ArticlesResponse) => {
  const navigate = useNavigate();

  const linkClasses = (link: ArticleLink, i: number) => {
    const classNames = [];
    if (link.active) classNames.push(styles.selected);
    if (current_page === 1 && i === 0) classNames.push(styles.hide);
    if (current_page === last_page && i === last_page + 1)
      classNames.push(styles.hide);
    return classNames.join(" ");
  };

  const handlePageChange = (url: string) => {
    const page = url.match(/[0-9]+$/);
    navigate({ search: `?page=${page}` });
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.pagination}>
      <ul>
        {links.map((link, i) => (
          <li
            className={linkClasses(link, i)}
            key={i}
            onClick={() => handlePageChange(link.url)}
          >
            {link.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BasePagination;
