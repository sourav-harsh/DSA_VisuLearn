/** A box in the animated flow diagram (a person, class or system). */
export interface SDNode {
  id: string;
  label: string;
  /** plain-English role, shown under the label */
  sub?: string;
}

/** One animation step: which boxes light up and what is happening. */
export interface SDStep {
  caption: string;
  /** ids currently in focus */
  active?: string[];
  /** ids already finished */
  done?: string[];
  /** ids shown as rejected / avoided */
  reject?: string[];
  /** small token travelling through the flow, e.g. a request or an event */
  token?: string;
  /** result line shown under the stage */
  output?: string;
}

export interface SDConcept {
  id: string;
  name: string;
  tagline: string;
  /** one-line analogy for a non-engineer */
  analogy: string;
  explanation: string[];
  /** bullet answers to "when do I reach for this?" */
  useWhen: string[];
  /** how it differs from the patterns it is most confused with */
  differsFrom?: string;
  nodes: SDNode[];
  steps: SDStep[];
  javaCode: string;
  springCode?: string;
  springNote?: string;
}

export interface SDSection {
  slug: string;
  title: string;
  blurb: string;
  /** short label used on cards, e.g. "Creational" */
  kind: string;
  concepts: SDConcept[];
}