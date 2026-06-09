import { describe, expect, it } from "vitest";
import { SpecParseError, extractSections, hasSpecId, parseSpec } from "./spec.js";

const SAMPLE = `---
id: 3f1a8c2e-0b7d-4e2a-9c11-2a6b8d4e1f00
title: Example Feature
kind: feature
---

# Example Feature

Intro paragraph.

## Problem

Users cannot do X.

## Requirements

- Must do A
- Must do B
`;

describe("parseSpec", () => {
  it("parses frontmatter and sections", () => {
    const spec = parseSpec(SAMPLE, "specs/example/spec.md");
    expect(spec.frontmatter.id).toBe("3f1a8c2e-0b7d-4e2a-9c11-2a6b8d4e1f00");
    expect(spec.frontmatter.title).toBe("Example Feature");
    const headings = spec.sections.map((s) => s.heading);
    expect(headings).toContain("Problem");
    expect(headings).toContain("Requirements");
  });

  it("throws on missing id", () => {
    expect(() => parseSpec(`---\ntitle: No ID\n---\nbody`)).toThrow(SpecParseError);
  });
});

describe("hasSpecId", () => {
  it("detects presence/absence of id", () => {
    expect(hasSpecId(SAMPLE)).toBe(true);
    expect(hasSpecId(`---\ntitle: x\n---\nbody`)).toBe(false);
  });
});

describe("extractSections", () => {
  it("captures heading levels", () => {
    const sections = extractSections("## A\nbody a\n### B\nbody b");
    expect(sections).toHaveLength(2);
    expect(sections[0]!.level).toBe(2);
    expect(sections[1]!.level).toBe(3);
  });
});
