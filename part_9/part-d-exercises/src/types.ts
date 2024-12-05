interface CoursePartBase {
	name: string;
	exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
	kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
	groupProjectCount: number;
	kind: 'group';
}

interface CoursePartBackground extends CoursePartBase {
	backgroundMaterial: string;
	kind: 'background';
}

interface CoursePartDescription extends CoursePartBase {
	description: string;
	kind: 'background' | 'basic' | 'special';
}

interface CoursePartSpecial extends CoursePartBase {
	requirements: string[];
	kind: 'special';
}

export type CoursePart =
	| (CoursePartBasic & CoursePartDescription)
	| CoursePartGroup
	| (CoursePartBackground & CoursePartDescription)
	| (CoursePartSpecial & CoursePartDescription);

export interface PartProps {
	part: CoursePart;
}

export interface TotalProps {
	total: number;
}

export interface ContentProps {
	parts: CoursePart[];
}
