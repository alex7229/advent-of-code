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

export interface PassTimeThroughParticle {
  (particle: Particle, secs: number): Particle;
}

export interface GetManhattanDistance {
  (coordinate: Coordinate): number;
}

interface FindClosestParticleIndex {
  (
    particles: Particle[],
    passTimeThroughParticle: PassTimeThroughParticle,
    getManhattanDistance: GetManhattanDistance
  ): number;
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

export const passTimeThroughParticle: PassTimeThroughParticle = (particle, secs) => {
  // formula for path S = S + v*t + at*t/2
  // formula for speed V = V + a*t
  return {
    acceleration: particle.acceleration,
    velocity: {
      x: particle.velocity.x + particle.acceleration.x * secs,
      y: particle.velocity.y + particle.acceleration.y * secs,
      z: particle.velocity.z + particle.acceleration.z * secs
    },
    position: {
      x: particle.position.x + particle.velocity.x * secs + particle.acceleration.x * secs * secs / 2,
      y: particle.position.y + particle.velocity.y * secs + particle.acceleration.y * secs * secs / 2,
      z: particle.position.z + particle.velocity.z * secs + particle.acceleration.z * secs * secs / 2,
    }
  };
};

export const getManhattanDistance: GetManhattanDistance = coordinate =>
  Math.abs(coordinate.x) + Math.abs(coordinate.y) + Math.abs(coordinate.z);

export const findClosestParticleIndex: FindClosestParticleIndex = (
  particles,
  passTimeThroughParticleFunc,
  getManhattanDistanceFunc
) => {
  let closestIndex = 0;
  let closestDistance: number | null = null;
  particles.forEach((particle, index) => {
    const currentParticle = passTimeThroughParticleFunc(particle, 10 ** 6);
    const currentDistance = getManhattanDistanceFunc(currentParticle.position);
    if (closestDistance === null || closestDistance > currentDistance) {
      closestIndex = index;
      closestDistance = currentDistance;
    }
  });
  return closestIndex;
};

export const day20Part1Factory = (input: string) => {
  const particles = parseParticles(input, splitByRows);
  return findClosestParticleIndex(particles, passTimeThroughParticle, getManhattanDistance);
};