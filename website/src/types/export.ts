import { SemTimetableConfig, SimplifiedLesson } from 'types/timetables';
import { Semester } from 'types/modules';
import { Mode } from 'types/settings';
import { ColorMapping, ThemeState } from 'types/reducers';

export type ExportData = {
  readonly semester: Semester;
  readonly timetable: SemTimetableConfig;
  readonly colors: ColorMapping;
  readonly hidden: SimplifiedLesson[];
  readonly theme: ThemeState;
  readonly settings: {
    mode: Mode;
  };
};
