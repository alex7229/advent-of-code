import {
  findClosestParticleIndex,
  getManhattanDistance,
  parseParticles,
  Particle, passTimeThroughParticle
} from '../../../../answers/days/20/part1';
import { splitByRows } from '../../../../utils';

describe('day 20, part 1', () => {
  describe('parse particles function', () => {
    it('should throw if any of the coordinates are incorrect', () => {
      const wrongPosition = 'p=<-1836,,-2597>, v=<101,145,56>, a=<0,-4,9>';
      const wrongSpeed = 'p=<-1836,-1907,-2597>, v=<101,bas,56>, a=<0,-4,9>';
      const wrongAcceleration = 'p=<-1836,-1907,-2597>, v=<101,145,56>, a=<0,s>';
      const wrongPattern = 'p=<-1836,-1907,-2597>, s, a=<0,-4,9>';
      expect(() => parseParticles(wrongAcceleration, splitByRows)).toThrow();
      expect(() => parseParticles(wrongPattern, splitByRows)).toThrow();
      expect(() => parseParticles(wrongSpeed, splitByRows)).toThrow();
      expect(() => parseParticles(wrongPosition, splitByRows)).toThrow();
    });
    it('should parse a particle correctly', () => {
      const input = 'p=<-63,945,-1094>, v=<-55,-81,61>, a=<6,3,0>';
      const particle: Particle = {
        position: { x: -63, y: 945, z: -1094 },
        velocity: { x: -55, y: -81, z: 61 },
        acceleration: { x: 6, y: 3, z: 0 }
      };
      expect(parseParticles(input, splitByRows)).toEqual([particle]);
    });
  });

  describe('pass time through particle function', () => {
    it('should calculate position and velocity correctly', () => {
      const particle: Particle = {
        position: { x: 3, y: 2, z: 7 },
        velocity: { x: 2, y: 2, z: 3 },
        acceleration: { x: -1, y: 5, z: 1 },
      };
      const particleAfter2Secs: Particle = {
        acceleration: particle.acceleration,
        velocity: { x: 0, y: 12, z: 5 },
        position: { x: 5, y: 16, z: 15 }
      };
      expect(passTimeThroughParticle(particle, 2)).toEqual(particleAfter2Secs);
    });
  });

  describe('get manhattan distance', () => {
    it('should calculate the distance correctly', () => {
      const coordinate = { x: 5, y: 19, z: -100 };
      expect(getManhattanDistance(coordinate)).toBe(124);
    });
  });

  describe('find closest particle index function', () => {
    it('should find the closest particle index correctly', () => {
      const particles: Particle[] = [
        {
          position: { x: 3, y: 0, z: 0 },
          velocity: { x: 2, y: 0, z: 0 },
          acceleration: { x: -1, y: 0, z: 0 },
        },
        {
          position: { x: 4, y: 0, z: 0 },
          velocity: { x: 0, y: 0, z: 0 },
          acceleration: { x: -2, y: 0, z: 0 },
        }
      ];
      expect(findClosestParticleIndex(particles, passTimeThroughParticle, getManhattanDistance)).toBe(0);
    });
  });
});