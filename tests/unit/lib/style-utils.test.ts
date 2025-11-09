import { getTrackDisplayName, getLevelColor, getPerspectiveColor, getTrackColor } from '@/lib/style-utils';

describe('style-utils', () => {
  describe('getTrackDisplayName', () => {
    it("should return 'Hands-on Studio' for track 'Track D'", () => {
      expect(getTrackDisplayName('Track D')).toBe('Hands-on Studio');
    });

    it("should return 'Track A' for track 'Track A'", () => {
      expect(getTrackDisplayName('Track A')).toBe('Track A');
    });

    it("should return 'Track B' for track 'Track B'", () => {
      expect(getTrackDisplayName('Track B')).toBe('Track B');
    });

    it("should return 'Track C' for track 'Track C'", () => {
      expect(getTrackDisplayName('Track C')).toBe('Track C');
    });
  });

  describe('getLevelColor', () => {
    it('should return blue for Beginner', () => {
      expect(getLevelColor('Beginner')).toBe('bg-gdg-pastel-blue');
    });
    it('should return green for Intermediate', () => {
      expect(getLevelColor('Intermediate')).toBe('bg-gdg-pastel-green');
    });
    it('should return red for Advanced', () => {
      expect(getLevelColor('Advanced')).toBe('bg-gdg-pastel-red');
    });
    it('should return gray for undefined', () => {
      expect(getLevelColor(undefined)).toBe('bg-gray-200');
    });
  });

  describe('getPerspectiveColor', () => {
    it('should return blue for Introduction', () => {
      expect(getPerspectiveColor('Introduction')).toBe('bg-google-blue-500 text-white');
    });
    it('should return green for Experience', () => {
      expect(getPerspectiveColor('Experience')).toBe('bg-google-green-500 text-white');
    });
    it('should return red for Challenge', () => {
      expect(getPerspectiveColor('Challenge')).toBe('bg-google-red-500 text-white');
    });
    it('should return gray for undefined', () => {
      expect(getPerspectiveColor(undefined)).toBe('bg-gray-200');
    });
  });

  describe('getTrackColor', () => {
    it('should return red for track "Track A"', () => {
      expect(getTrackColor('Track A')).toBe('bg-gdg-pastel-red');
    });
    it('should return blue for track "Track B"', () => {
      expect(getTrackColor('Track B')).toBe('bg-gdg-pastel-blue');
    });
    it('should return green for track "Track C"', () => {
      expect(getTrackColor('Track C')).toBe('bg-gdg-pastel-green');
    });
    it('should return yellow for track "Track D"', () => {
      expect(getTrackColor('Track D')).toBe('bg-gdg-pastel-yellow');
    });
    it('should return red for track "A"', () => {
      expect(getTrackColor('A')).toBe('bg-gdg-pastel-red');
    });
    it('should return blue for track "B"', () => {
      expect(getTrackColor('B')).toBe('bg-gdg-pastel-blue');
    });
    it('should return green for track "C"', () => {
      expect(getTrackColor('C')).toBe('bg-gdg-pastel-green');
    });
    it('should return yellow for track "D"', () => {
      expect(getTrackColor('D')).toBe('bg-gdg-pastel-yellow');
    });
    it('should return yellow for track "Hands-on Studio"', () => {
      expect(getTrackColor('Hands-on Studio')).toBe('bg-gdg-pastel-yellow');
    });
    it('should return gray for undefined', () => {
      expect(getTrackColor(undefined)).toBe('bg-gray-200');
    });
  });
});
