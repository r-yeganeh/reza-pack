import { createTestingModule } from './helper';
import { Types } from 'mongoose';
import { OrderStatus } from '../../types';
import { Order } from '../schemas/order.schema';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('OrderService', () => {
  let orderService, orderModel;

  beforeEach(async () => {
    ({ orderService, orderModel } = await createTestingModule());
  });

  const mockSuccessfulStatusUpdate = async (orderId, oldStatus, newStatus) => {
    const getOrderMock = jest
      .spyOn(orderService, 'getOrder')
      .mockResolvedValue({
        _id: orderId,
        status: oldStatus,
      } as Order);

    const findOneAndUpdateMock = jest
      .spyOn(orderModel, 'findOneAndUpdate')
      .mockResolvedValue({
        _id: orderId,
        status: newStatus,
      } as Order);

    const result = await orderService.updateOrderStatus(orderId, newStatus);

    expect(getOrderMock).toHaveBeenCalledWith(orderId);
    expect(findOneAndUpdateMock).toHaveBeenCalledWith(
      { _id: orderId },
      {
        $set: {
          status: newStatus,
        },
      },
      { new: true },
    );
    expect(result).toEqual({
      updatedOrder: {
        _id: orderId,
        status: newStatus,
      },
      oldStatus: oldStatus,
    });

    return result;
  };

  const mockFailedStatusUpdate = async (orderId, oldStatus, newStatus) => {
    const getOrderMock = jest
      .spyOn(orderService, 'getOrder')
      .mockResolvedValue({
        _id: orderId,
        status: oldStatus,
      } as Order);
    await expect(
      orderService.updateOrderStatus(orderId, newStatus),
    ).rejects.toThrowError(BadRequestException);
    expect(getOrderMock).toHaveBeenCalledWith(orderId);
  };

  it('should be defined', () => {
    expect(orderService).toBeDefined();
  });

  describe('updateOrderStatus', () => {
    it('should throw not found exception when order is not found', async () => {
      const orderId = new Types.ObjectId();
      const getOrderMock = jest
        .spyOn(orderService, 'getOrder')
        .mockResolvedValue(null);
      await expect(
        orderService.updateOrderStatus(orderId, OrderStatus.Created),
      ).rejects.toThrowError(NotFoundException);
      expect(getOrderMock).toHaveBeenCalledWith(orderId);
    });

    it('should update order status from created to picked up', async () => {
      await mockSuccessfulStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Created,
        OrderStatus.PickedUp,
      );
    });

    it('should update order status from created to cancelled', async () => {
      await mockSuccessfulStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Created,
        OrderStatus.Cancelled,
      );
    });

    it('should throw BadRequestException from created to an invalid status', async () => {
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Created,
        OrderStatus.Created,
      );
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Created,
        OrderStatus.Delivered,
      );
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Created,
        OrderStatus.Returning,
      );
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Created,
        OrderStatus.Returned,
      );
    });

    it('should update order status from picked up to delivered', async () => {
      await mockSuccessfulStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.PickedUp,
        OrderStatus.Delivered,
      );
    });

    it('should update order status from picked up to returning', async () => {
      await mockSuccessfulStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.PickedUp,
        OrderStatus.Returning,
      );
    });

    it('should throw BadRequestException from picked up to an invalid status', async () => {
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.PickedUp,
        OrderStatus.PickedUp,
      );
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.PickedUp,
        OrderStatus.Created,
      );
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.PickedUp,
        OrderStatus.Cancelled,
      );
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.PickedUp,
        OrderStatus.Returned,
      );
    });

    it('should update order status from returning to returned', async () => {
      await mockSuccessfulStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.PickedUp,
        OrderStatus.Delivered,
      );
    });

    it('should throw BadRequestException from returning to an invalid status', async () => {
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Returning,
        OrderStatus.Created,
      );
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Returning,
        OrderStatus.PickedUp,
      );
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Returning,
        OrderStatus.Cancelled,
      );
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Returning,
        OrderStatus.Delivered,
      );
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Returning,
        OrderStatus.Returning,
      );
    });

    it('should throw BadRequestException from cancelled to any status', async () => {
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Cancelled,
        OrderStatus.Cancelled,
      );
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Cancelled,
        OrderStatus.Created,
      );
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Cancelled,
        OrderStatus.PickedUp,
      );
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Cancelled,
        OrderStatus.Delivered,
      );
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Cancelled,
        OrderStatus.Returning,
      );
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Cancelled,
        OrderStatus.Returned,
      );
    });

    it('should throw BadRequestException from delivered to any status', async () => {
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Delivered,
        OrderStatus.Delivered,
      );
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Delivered,
        OrderStatus.Created,
      );
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Delivered,
        OrderStatus.PickedUp,
      );
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Delivered,
        OrderStatus.Cancelled,
      );
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Delivered,
        OrderStatus.Returning,
      );
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Delivered,
        OrderStatus.Returned,
      );
    });

    it('should throw BadRequestException from returned to any status', async () => {
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Returned,
        OrderStatus.Returned,
      );
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Returned,
        OrderStatus.Created,
      );
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Returned,
        OrderStatus.PickedUp,
      );
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Returned,
        OrderStatus.Delivered,
      );
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Returned,
        OrderStatus.Cancelled,
      );
      await mockFailedStatusUpdate(
        new Types.ObjectId(),
        OrderStatus.Returned,
        OrderStatus.Returning,
      );
    });
  });
});
