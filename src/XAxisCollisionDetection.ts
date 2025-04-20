import { CollisionDetection, Collision } from "@dnd-kit/core";

export const xAxisCollisionDetection: CollisionDetection = ({
  droppableContainers,
  collisionRect,
}) => {
  let bestMatch: Collision | null = null;
  let maxOverlap = 0;

  for (const droppable of droppableContainers) {
    const rect = droppable.rect;
    if (!rect.current) continue;

    const containerRect = rect.current;
    const itemLeft = collisionRect.left;
    const itemRight = collisionRect.right;
    const containerLeft = containerRect.left;
    const containerRight = containerRect.right;

    const overlapLeft =
      Math.min(itemRight, containerRight) - Math.max(itemLeft, containerLeft);
    const overlapRight =
      Math.min(itemRight, containerRight) - Math.max(itemLeft, containerLeft);

    const overlap = Math.max(overlapLeft, overlapRight);

    if (overlap > 0) {
      const overlapPercentage = overlap / collisionRect.width;

      if (overlapPercentage > maxOverlap) {
        maxOverlap = overlapPercentage;
        bestMatch = {
          id: droppable.id,
          data: { droppableContainer: droppable },
        };
      }
    }
  }

  return bestMatch ? [bestMatch] : [];
};
