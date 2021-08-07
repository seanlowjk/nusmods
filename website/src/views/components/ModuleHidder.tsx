import { memo } from 'react';
import classnames from 'classnames';
import Downshift, { ChildrenFunction } from 'downshift';

import { Lesson, SimplifiedLesson } from 'types/timetables';
import { EyeOff } from 'react-feather';
import { ModuleCode, Semester } from 'types/modules';
import { LESSON_TYPE_ABBREV } from 'utils/timetables';
import Tooltip from 'views/components/Tooltip';
import styles from './ModuleHidder.scss';

type Props = {
  moduleCode: ModuleCode;
  semester: Semester;
  lessons: SimplifiedLesson[];
  toggleLessonHide: (
    moduleCode: ModuleCode,
    lessons: SimplifiedLesson[],
    isHidden: boolean,
  ) => void;
  isLessonHiddenInTimetable: (lesson: Lesson | SimplifiedLesson) => boolean;
};

/**
 * ColorPicker presentational component
 *
 * For use in places like changing module colors
 */
const ModuleHidder = memo<Props>((props) => {
  const { moduleCode, lessons } = props;

  const getHideLessonLabel = (lesson: SimplifiedLesson) => {
    const isHidden = props.isLessonHiddenInTimetable(lesson);
    return `${isHidden ? 'Show' : 'Hide'} ${lesson.moduleCode} ${lesson.lessonType}`;
  };

  const shouldHide = (simplifiedLessons: SimplifiedLesson[]) =>
    !simplifiedLessons
      .map((lesson) => props.isLessonHiddenInTimetable(lesson))
      .reduce((x, y) => x || y);

  const toggleLessonHide = (code: ModuleCode, simplifiedLessons: SimplifiedLesson[]) => {
    if (simplifiedLessons.length === 0) {
      return;
    }

    props.toggleLessonHide(code, simplifiedLessons, shouldHide(simplifiedLessons));
  };

  const getHideAllLessonsLabel = `${
    shouldHide(lessons) ? 'Hide' : 'Show'
  } all ${moduleCode} lessons`;

  const renderLessonHider: ChildrenFunction<SimplifiedLesson[]> = ({
    getItemProps,
    getToggleButtonProps,
    getMenuProps,
    isOpen,
  }) => (
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
          <Tooltip content={getHideAllLessonsLabel} touch="hold">
            <button
              className={classnames('btn btn-outline-secondary btn-svg', styles.moduleHide)}
              style={{ textDecoration: shouldHide(lessons) ? 'line-through' : 'none' }}
              type="button"
              {...getItemProps({ item: lessons })}
              key={moduleCode}
            >
              ALL
            </button>
          </Tooltip>
          {lessons.map((lesson: SimplifiedLesson) => (
            <Tooltip content={getHideLessonLabel(lesson)} touch="hold">
              <button
                className={classnames('btn btn-outline-secondary btn-svg', styles.moduleHide)}
                style={{
                  textDecoration: props.isLessonHiddenInTimetable(lesson) ? 'none' : 'line-through',
                }}
                type="button"
                {...getItemProps({ item: [lesson] })}
                key={`${lesson.moduleCode} ${lesson.lessonType}`}
              >
                {LESSON_TYPE_ABBREV[lesson.lessonType]}
              </button>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Downshift
      onChange={(toggleLessons) =>
        toggleLessons !== null && toggleLessonHide(moduleCode, toggleLessons)
      }
    >
      {renderLessonHider}
    </Downshift>
  );
});

export default ModuleHidder;
