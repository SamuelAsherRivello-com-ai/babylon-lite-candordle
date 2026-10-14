# Spec Delta

## Purpose

Provide category answer lists that are familiar, non-plural, well-fitting words and are reviewable by players and maintainers.

## ADDED Requirements

### Requirement: Curated category answers
Every answer SHALL be a familiar five-letter English word that fits its selected category. The game SHALL not use automatic broad-dictionary backfilling for answers.

#### Scenario: Category round begins
- **WHEN** a player begins a round with a selected category
- **THEN** the selected answer SHALL belong to that category's reviewed answer list

### Requirement: Answer form and Wordle exclusions
Answer lists SHALL exclude plurals and every word from the historical original Wordle answer list. They MAY contain familiar non-plural forms such as ordinary past, present, and descriptive forms when they fit the category.

#### Scenario: Candidate answer is a plural
- **WHEN** a candidate answer is a plural form
- **THEN** the candidate SHALL not appear in an answer list

#### Scenario: Candidate appears in the historical Wordle answer list
- **WHEN** a candidate answer appears in the historical original Wordle answer list
- **THEN** the candidate SHALL not appear in an answer list

### Requirement: Word-list audit report
The project SHALL publish an audit report that identifies each removed category answer, its replacement, and the reason for replacement.

#### Scenario: Maintainer reviews a replacement
- **WHEN** a maintainer opens the word-list audit report
- **THEN** they SHALL be able to identify the original word, replacement word, category, and replacement reason
