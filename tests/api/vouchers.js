import vouchers from 'api/vouchers';

describe('vouchers', () => {
  context('get', () => {
    it('should exist', () => {
      vouchers.should.have.a.property('get').which.is.a.Function();
    });
    it('should return Promise', () => {
      vouchers.get().should.be.a.Promise();
    });
    it('should generate an Array of Objects', (done) => {
      vouchers.get()
        .then((data) => {
          data.should.be.an.Array().and.matchEach(e => e.should.be.an.Object());
        })
        .then(done).catch(done);
    });
    it('should generate an Array of Objects with predefined structure', (done) => {
      const PROPERTIES = [
        'brand_image_url', 'brand_name', 'serial_number', 'cvv', 'face_value',
        'asking_price', 'discount', 'seller', 'created', 'id', 'notes', 'currency',
        'paper_voucher', 'bulk_id', 'invoice_number', 'order_number', 'status',
      ];
      vouchers.get()
        .then((data) => {
          data.should.matchEach((e) => {
            Object.keys(e).should.be.deepEqual(PROPERTIES);
          });
        })
        .then(done).catch(done);
    });
  });
});


