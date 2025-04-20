import { CollisionDetection, Collision } from "@dnd-kit/core";

export const xAxisCollisionDetection: CollisionDetection = ({
  droppableContainers,
  collisionRect,
}) => {
  const collisions: Collision[] = [];

  const centerX = (collisionRect.left + collisionRect.right) / 2;

  for (const droppable of droppableContainers) {
    const rect = droppable.rect.current;
    if (!rect) continue;

    const xWithinBounds = centerX >= rect.left && centerX <= rect.right;

    if (xWithinBounds) {
      const deltaX = Math.abs(centerX - (rect.left + rect.width / 2));
      collisions.push({
        id: droppable.id,
        data: { delta: deltaX },
      });
    }
  }

  // Sort by closeness to center X, optional
  collisions.sort((a, b) => (a.data?.delta ?? 0) - (b.data?.delta ?? 0));

  return collisions;
};
