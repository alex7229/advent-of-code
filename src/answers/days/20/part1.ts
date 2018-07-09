import { splitByRows, SplitByRows } from '../../../utils';

interface Coordinate {
  x: number;
  y: number;
  z: number;
}

export interface Particle {
  position: Coordinate;
  velocity: Coordinate;
  acceleration: Coordinate;
}

interface ParseParticles {
  (input: string, splitByRows: SplitByRows): Particle[];
}

interface FindPositionInTime {
  (particle: Particle, secs: number): Coordinate;
}

interface GetManhattanDistance {
  (coordinate: Coordinate): number;
}

interface FindClosestParticleIndex {
  (particles: Particle[], findPositionInTime: FindPositionInTime, getManhattanDistance: GetManhattanDistance): number;
}

export const parseParticles: ParseParticles = (input, splitByRowsFunc) =>
  splitByRowsFunc(input)
    .map(row => {
      const regExp = /p=<([^>]+)>, v=<([^>]+)>, a=<([^>]+)>/;
      const match = row.match(regExp);
      if (match === null) {
        throw new Error(`particle ${row} is not correct`);
      }
      const [, position, velocity, acceleration] = match
        .map(dataString => dataString.split(','))
        .map(coordinates => {
          return coordinates
            .map((coordinate => parseInt(coordinate, 10)))
            .filter(coordinate => !Number.isNaN(coordinate));
        });
      if (position.length !== 3 || velocity.length !== 3 || acceleration.length !== 3) {
        throw new Error(`coordinates of the ${row} particle aren't correct`);
      }
      return {
        position: { x: position[0], y: position[1], z: position[2] },
        velocity: { x: velocity[0], y: velocity[1], z: velocity[2] },
        acceleration: { x: acceleration[0], y: acceleration[1], z: acceleration[2] }
      };
    });

export const findPositionInTime: FindPositionInTime = (particle, secs) => {
  // formula is S = S + v*t + at*t/2
  return {
    x: particle.position.x + particle.velocity.x * secs + particle.acceleration.x * secs * secs / 2,
    y: particle.position.y + particle.velocity.y * secs + particle.acceleration.y * secs * secs / 2,
    z: particle.position.z + particle.velocity.z * secs + particle.acceleration.z * secs * secs / 2,
  };
};

export const getManhattanDistance: GetManhattanDistance = coordinate =>
  Math.abs(coordinate.x) + Math.abs(coordinate.y) + Math.abs(coordinate.z);

export const findClosestParticleIndex: FindClosestParticleIndex = (
  particles,
  findPositionInTimeFunc,
  getManhattanDistanceFunc
) => {
  let closestIndex = 0;
  let closestDistance: number | null = null;
  particles.forEach((particle, index) => {
    const currentPosition = findPositionInTime(particle, 10 ** 6);
    const currentDistance = getManhattanDistance(currentPosition);
    if (closestDistance === null || closestDistance > currentDistance) {
      closestIndex = index;
      closestDistance = currentDistance;
    }
  });
  return closestIndex;
};

export const day20Part1Factory = (input: string) => {
  const particles = parseParticles(input, splitByRows);
  return findClosestParticleIndex(particles, findPositionInTime, getManhattanDistance);
};