import { memo } from 'react';
import classnames from 'classnames';
import Downshift, { ChildrenFunction } from 'downshift';

import { SimplifiedLesson } from 'types/timetables';

import { ModuleCode, Semester } from 'types/modules';
import styles from './ColorPicker.scss';

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
      <div>
        <button
          type="button"
          {...getToggleButtonProps({
            title: moduleCode,
          })}
          className={classnames('btn btn-block hoverable')}
        >
          A
        </button>
        <div
          className={classnames(styles.palette, { [styles.isClosed]: !isOpen })}
          {...getMenuProps()}
        >
          {lessons.map((lesson: SimplifiedLesson) => (
            <button type="button" {...getItemProps({ item: lesson })} key={lesson.lessonType}>
              {lesson.lessonType}
            </button>
          ))}
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
