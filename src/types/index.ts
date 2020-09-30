export type FullRow = [number, number, number, number, number, number, number, number, number]

export type Board = [
	FullRow,
	FullRow,
	FullRow,
	FullRow,
	FullRow,
	FullRow,
	FullRow,
	FullRow,
	FullRow,
]

type NoteBox = {
	1?: boolean
	2?: boolean
	3?: boolean
	4?: boolean
	5?: boolean
	6?: boolean
	7?: boolean
	8?: boolean
	9?: boolean
}

type NoteRow = [
	NoteBox | undefined,
	NoteBox | undefined,
	NoteBox | undefined,
	NoteBox | undefined,
	NoteBox | undefined,
	NoteBox | undefined,
	NoteBox | undefined,
	NoteBox | undefined,
	NoteBox | undefined,
]

export type Notes = [
	NoteRow | undefined,
	NoteRow | undefined,
	NoteRow | undefined,
	NoteRow | undefined,
	NoteRow | undefined,
	NoteRow | undefined,
	NoteRow | undefined,
	NoteRow | undefined,
	NoteRow | undefined,
]

export interface Score {
	id: string
	score: number
}

export type Answers = Record<string, 'you' | 'opponent'>
