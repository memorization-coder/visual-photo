import type { MomentsPeopleLovedItem } from "@visual-photo/contracts";

export function sortMomentsPeopleLoved(
  items: readonly MomentsPeopleLovedItem[]
): MomentsPeopleLovedItem[] {
  return [...items].sort((left, right) => {
    if (right.loveCount !== left.loveCount) {
      return right.loveCount - left.loveCount;
    }

    return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
  });
}

