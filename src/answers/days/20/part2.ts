import { getManhattanDistance, GetManhattanDistance, Particle, PassTimeThroughParticle } from './part1';
import * as _ from 'lodash';

interface Lodash {
  cloneDeep: <T>(input: T) => T;
  // tslint:disable-next-line no-any
  sortBy: <T>(input: T, callback: any) => T;
  // tslint:disable-next-line no-any
  isEqual: (first: any, second: any) => boolean;
}

interface RemoveCollidedParticles {
  (particles: Particle[], getManhattanDistance: GetManhattanDistance, lodash: Lodash): Particle[];
}

interface RemoveCollidedParticlesFactory {
  (particles: Particle[]): Particle[];
}

interface FindParticlesNumber {
  (
    particles: Particle[],
    secs: number,
    removeCollidedParticles: RemoveCollidedParticlesFactory,
    passTimeThroughParticle: PassTimeThroughParticle
  ): number;
}

export const removeCollidedParticles: RemoveCollidedParticles = (particles, getManhattanDistanceFunc, lodash) => {
  const particlesSorted = lodash.sortBy(
    lodash.cloneDeep(particles),
    (particle: Particle) => getManhattanDistance(particle.position)
  );
  let uniqueParticles: Particle[] = [];
  let currentParticle: Particle | undefined;
  particlesSorted.forEach((particle, index) => {
    currentParticle = particle;
    const nextParticleCoordinates = particlesSorted[index + 1] && particlesSorted[index + 1].position;
    const previousParticleCoordinates = particlesSorted[index - 1] && particlesSorted[index - 1].position;
    if (
      lodash.isEqual(currentParticle.position, nextParticleCoordinates) ||
      lodash.isEqual(currentParticle.position, previousParticleCoordinates)
    ) {
      return;
    }
    uniqueParticles.push(currentParticle);
  });
  return uniqueParticles;
};

export const removeCollidedParticlesFactory: RemoveCollidedParticlesFactory = particles =>
  removeCollidedParticles(particles, getManhattanDistance, _);

export const findParticlesNumber: FindParticlesNumber = (
  particles,
  secs,
  removeCollidedParticlesFunc,
  passTimeThroughParticle
) => {
  let currentSecond = 0;
  let currentParticles = particles;
  while (currentSecond < secs) {
    currentParticles = currentParticles.map(particle => passTimeThroughParticle(particle, 1));
    currentParticles = removeCollidedParticlesFunc(currentParticles);
    currentSecond++;
  }
  return currentParticles.length;
};