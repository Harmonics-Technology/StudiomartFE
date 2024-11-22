/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Coordinate } from './Coordinate';
import type { Dimension } from './Dimension';
import type { Envelope } from './Envelope';
import type { GeometryFactory } from './GeometryFactory';
import type { OgcGeometryType } from './OgcGeometryType';
import type { Point } from './Point';
import type { PrecisionModel } from './PrecisionModel';

export type Geometry = {
    readonly coordinates?: Array<Coordinate> | null;
    readonly numPoints?: number;
    readonly isEmpty?: boolean;
    dimension?: Dimension;
    boundaryDimension?: Dimension;
    coordinate?: Coordinate;
    readonly geometryType?: string | null;
    ogcGeometryType?: OgcGeometryType;
    boundary?: Geometry;
    factory?: GeometryFactory;
    userData?: any;
    srid?: number;
    precisionModel?: PrecisionModel;
    readonly numGeometries?: number;
    readonly isSimple?: boolean;
    readonly isValid?: boolean;
    readonly area?: number;
    readonly length?: number;
    centroid?: Point;
    interiorPoint?: Point;
    pointOnSurface?: Point;
    envelope?: Geometry;
    envelopeInternal?: Envelope;
    readonly isRectangle?: boolean;
};
