# Chatbot API Test Suite

This directory contains comprehensive test cases for the hardened chatbot API route (`/app/api/route.js`). The tests cover all security measures implemented according to GitHub Issue #11.

## Test Files

### `route.simple.test.js`
Consolidated tests covering the hardened API route:
- **Input Validation**: JSON parsing, message structure, content length, role validation
- **Rate Limiting**: Enforces per‑IP limits and returns proper headers
- **Security Headers**: Verifies CSP and other headers on all responses
- **Error Handling**: Handles missing API key, upstream API failures with generic messages
- **Content Sanitization**: Strips dangerous characters before forwarding
- **Successful Flow**: Valid requests return model text with headers set

## Running Tests

```bash
# Run all tests
npm test

# Run only API tests
npm run test:api

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests for CI/CD
npm run test:ci
```

## Test Coverage

The test suite provides comprehensive coverage of:

### Security Features
- ✅ Input validation with length limits and sanitization
- ✅ Rate limiting with token bucket and cleanup
- ✅ Security headers (CSP, XSS protection, frame options, etc.)
- ✅ Secure error handling without secret leakage
- ✅ Secure logging with sensitive data redaction

### Functional Features
- ✅ Valid request processing
- ✅ Conversation history handling
- ✅ API integration with Gemini
- ✅ Content filtering and safety settings
- ✅ Performance and resource management

### Edge Cases
- ✅ Malicious input attempts
- ✅ Network failures and timeouts
- ✅ Concurrent requests
- ✅ Large payloads
- ✅ Unicode and special characters

## Security Test Scenarios

### Input Validation Tests
- Invalid JSON parsing
- Missing or malformed message arrays
- Content length violations (individual and total)
- Invalid roles and empty content
- Dangerous character sanitization

### Rate Limiting Tests
- Requests within and exceeding limits
- Rate limit headers verification
- Cleanup mechanism testing
- Concurrent request handling

### Security Headers Tests
- All required security headers present
- Content Security Policy validation
- XSS and clickjacking protection
- Referrer policy enforcement

### Error Handling Tests
- API key missing scenarios
- Gemini API failures
- Content filtering responses
- Network timeout handling
- Generic error messages (no secret leakage)

### Logging Security Tests
- API key redaction and sensitive data filtering via structured logs

## Mock Strategy

The suite uses lightweight, file‑local mocks (no global setup files):

- **NextRequest/NextResponse**: Mocked inline within `route.simple.test.js`
- **Fetch API**: Mocked per test to simulate Gemini responses/errors
- **Console.log**: Mocked to verify secure logging without leaking data
- **Environment Variables**: Overridden per test for API key scenarios

## Test Data

The suite exercises:
- Valid and invalid message arrays
- Malicious input samples for sanitization checks
- Unicode and special character content

## Continuous Integration

The test suite is designed for CI/CD integration:
- No external dependencies
- Deterministic results
- Comprehensive coverage reporting
- Fast execution
- Clear failure reporting

## Maintenance

When updating the API route:
1. Update corresponding test cases
2. Add new test cases for new features
3. Verify security measures are still tested
4. Run full test suite before deployment

## Security Considerations

The test suite itself follows security best practices:
- No real API keys in tests
- Mocked external dependencies
- No sensitive data in test files
- Secure test data generation
- Comprehensive security scenario coverage

