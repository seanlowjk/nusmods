import { memo } from 'react';
import classnames from 'classnames';
import Downshift, { ChildrenFunction } from 'downshift';

import { SimplifiedLesson } from 'types/timetables';
import { EyeOff } from 'react-feather';
import { ModuleCode, Semester } from 'types/modules';
import { LESSON_TYPE_ABBREV } from 'utils/timetables';
import styles from './ModuleHidder.scss';

type Props = {
  moduleCode: ModuleCode;
  semester: Semester;
  lessons: SimplifiedLesson[];
  toggleHideOption: (lesson: SimplifiedLesson) => void;
};

/**
 * ColorPicker presentational component
 *
 * For use in places like changing module colors
 */
const ModuleHidder = memo<Props>((props) => {
  const renderColorPicker: ChildrenFunction<SimplifiedLesson> = ({
    getItemProps,
    getToggleButtonProps,
    getMenuProps,
    isOpen,
  }) => {
    const { moduleCode, lessons } = props;

    return (
      <div className={classnames(styles.moduleHidder)}>
        <button
          type="button"
          {...getToggleButtonProps({
            title: moduleCode,
          })}
          className={classnames('btn btn-outline-secondary btn-svg', styles.moduleAction)}
        >
          <EyeOff className={styles.actionIcon} />
        </button>
        <div
          className={classnames('dropdown-menu', styles.dropdownMenu, { show: isOpen })}
          {...getMenuProps()}
        >
          <div className="btn-group-vertical">
            {lessons.map((lesson: SimplifiedLesson) => (
              <button
                className={classnames('btn btn-outline-secondary btn-svg', styles.moduleHide)}
                style={{ textDecoration: 'line-through' }}
                type="button"
                {...getItemProps({ item: lesson })}
                key={lesson.lessonType}
              >
                {LESSON_TYPE_ABBREV[lesson.lessonType]}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Downshift onChange={(lesson) => lesson !== null && props.toggleHideOption(lesson)}>
      {renderColorPicker}
    </Downshift>
  );
});

export default ModuleHidder;
